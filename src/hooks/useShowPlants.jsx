import {useState, useEffect} from 'react';
import { allUsers } from '../firebase/config';
import { auth } from '../firebase/config';
import { doc, onSnapshot, collection } from 'firebase/firestore';


export default function useShowPlants() {
    const userRef = doc(allUsers,auth.currentUser.uid);
    const [garden, setGarden] = useState([]);
    const gardenRef = collection(userRef, 'gardenCollection')

    useEffect(() => {

      onSnapshot(gardenRef, (snapshot)=>{
        let plants = [];
        snapshot.docs.forEach((doc)=>{
          plants.push({...doc.data(), id: doc.id})
        })
        setGarden(plants)
      
      })
    },[]);
    return garden;
}
