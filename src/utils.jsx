import { allUsers,  auth, firestore } from './firebase/config';
import { doc, getDocs, collection, query, where } from 'firebase/firestore';
import info from './data';

export const getAll=async(coll, queryName="none", queryValue="none")=>{
    const userRef = doc(allUsers,auth.currentUser.uid);
    const collRef= coll === "gardenCollection"? collection(userRef, coll): collection(firestore, coll);
    const ref = queryName==="none"? collRef : query(collRef, where(queryName, "==" , queryValue))
    const snapshot = await getDocs(ref);
    const items = snapshot.docs.map(doc=>({...doc.data(), id: doc.id}));
    return items;
}

export const getPlantsSortedByLastWater= async () =>{
    const subCollectionInfo = info.subCollection; 
    const todaySeconds = Math.floor(new Date().getTime() / 1000);
    const todayWholeDate =new Date()

    const allPlants = await getAll("gardenCollection");

    const thirsty = {name:subCollectionInfo[0].name , colorClass:subCollectionInfo[0].colorClass, plants:[]};
    const next = {name:subCollectionInfo[1].name , colorClass:subCollectionInfo[1].colorClass, plants:[]};
    const today = {name:subCollectionInfo[2].name , colorClass:subCollectionInfo[2].colorClass, plants:[]};
    const done ={name:subCollectionInfo[3].name , colorClass:subCollectionInfo[3].colorClass, plants:[]};
    let sortedArr
    allPlants .forEach(element => {
    const secondsleft = (element.lastWatered + (element.frequency * 86400))-todaySeconds
    const lastWateredWholeDate = new Date(element.lastWatered * 1000)

if( todayWholeDate.getDate() === lastWateredWholeDate.getDate() &&
    todayWholeDate.getMonth() === lastWateredWholeDate.getMonth()
){
done.plants.push(element)
}
else if ( (secondsleft + 43200) < 43200){
    thirsty.plants.push(element)
}
else if((secondsleft + 43200) > 43200){
    next.plants.push(element)
}
else if(secondsleft>=0 && secondsleft<= 43200){
    today.plants.push(element)
}
return sortedArr =[thirsty, next, today, done]
})
return sortedArr
}