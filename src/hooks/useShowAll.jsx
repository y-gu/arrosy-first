import {useState, useEffect} from 'react';
import { allUsers,  auth, firestore } from '../firebase/config';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';


const useShowAll=(coll, queryName="none", queryValue="none")=>{
    const userRef = doc(allUsers,auth.currentUser.uid);
    const [items, setItems] = useState([]);
    const collRef= coll === "gardenCollection"? collection(userRef, coll): collection(firestore, coll);
    const ref = queryName==="none"? collRef : query(collRef, where(queryName, "==" , queryValue))

    useEffect(() => {

      onSnapshot(ref, (snapshot)=>{
        let allItems = [];
        snapshot.docs.forEach((doc)=>{
          allItems.push({...doc.data(), id: doc.id})
        })
        setItems(allItems)
      
      })
    },[]);
    return  items;
}
export default useShowAll