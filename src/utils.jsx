import { allUsers, auth, firestore } from './firebase/config';
import { doc, getDocs, collection, query, where, getDoc } from 'firebase/firestore';
import info from './data';



export const getAll = async (coll, queryName = "none", queryValue = "none") => {
    const userRef = doc(allUsers, auth.currentUser.uid);
    const collRef = coll === "gardenCollection" ? collection(userRef, coll) : collection(firestore, coll);
    const ref = queryName === "none" ? collRef : query(collRef, where(queryName, "==", queryValue))
    const snapshot = await getDocs(ref);
    const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return items;
}


export const getOne = async(id, coll="gardenCollection")=>{
    const userRef = doc(allUsers, auth.currentUser.uid);
    const collRef = coll === "gardenCollection" ? collection(userRef, coll) : collection(firestore, coll);
    const itemRef = doc(collRef, id);
    const snapshot = await getDoc(itemRef);
    const data = snapshot.exists() ? snapshot.data() : null

    if (data === null || data === undefined) return null
    return {data:{ id, ...data }, itemRef }
    
}


//get plants divided in groups by the time of watering
export const getPlantsSortedByLastWater = async () => {

    const subCollectionInfo = info.subCollection;

    // create 4 groups with their caracteristics
    const thirsty = { name: subCollectionInfo[0].name, colorClass: subCollectionInfo[0].colorClass, plants: [] };
    const today = { name: subCollectionInfo[1].name, colorClass: subCollectionInfo[1].colorClass, plants: [] };
    const next = { name: subCollectionInfo[2].name, colorClass: subCollectionInfo[2].colorClass, plants: [] };
    const done = { name: subCollectionInfo[3].name, colorClass: subCollectionInfo[3].colorClass, plants: [] };

    // prepare info about time
    const todaySeconds = Math.floor(new Date().getTime() / 1000);
    const todayWholeDate = new Date();

    // get all the user's plants from firestore
    const allPlants = await getAll("gardenCollection");
    let sortedArr


    allPlants.forEach(element => {

        const lastWateredWholeDate = new Date(element.lastWatered * 1000)
        const whenToWaterWholeDate = new Date((element.lastWatered + (element.frequency * 86400)) * 1000)
        const daysLeft = ((element.lastWatered + (element.frequency * 86400)) - todaySeconds) / 86400

        if (todayWholeDate.getDate() === whenToWaterWholeDate.getDate() &&
            todayWholeDate.getMonth() === whenToWaterWholeDate.getMonth()
        ) {
            today.plants.push(element)
        }
        else if (todayWholeDate.getDate() === lastWateredWholeDate.getDate() &&
            todayWholeDate.getMonth() === lastWateredWholeDate.getMonth()
        ) {
            done.plants.push(element)
        }

        else if (daysLeft > 0 & daysLeft <= 2) {
            next.plants.push(element)
        }
        else if (daysLeft < 0) {
            thirsty.plants.push(element)
        }

        return sortedArr = [thirsty,today, next, done]
    })
    return sortedArr
}