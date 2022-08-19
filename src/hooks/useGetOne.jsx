import { doc,collection,onSnapshot } from "firebase/firestore";
import { allUsers } from '../firebase/config';
import { auth } from '../firebase/config';
import { firestore} from '../firebase/config';
import {useState, useEffect} from 'react';

export default  function useGetOne(coll, id) {

const [item, setItem]=useState({name:"loading"})
    const userRef = doc(allUsers, auth.currentUser.uid);
    const collRef= coll === "gardenCollection"? collection(userRef, coll): collection(firestore, coll);
    //const collRef=collection(userRef, coll)
    const itemRef = doc(collRef, id);

    useEffect(() => {  
        const unsub = onSnapshot(itemRef, (doc)=>{
          setItem(doc.data())
          })
        return ()=>unsub()
       
       },[]);
      
       return {item , itemRef}
}
