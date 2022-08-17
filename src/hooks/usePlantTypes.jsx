import {useState, useEffect} from 'react';
import { allPlantTypes} from '../firebase/config';
import { onSnapshot} from 'firebase/firestore';


export default function usePlantTypes() {

    const [plantTypes, setPlantTypes]=useState([]);


    useEffect(() => {

      onSnapshot( allPlantTypes, (snapshot)=>{
        let types = [];
        snapshot.docs.forEach((doc)=>{
          types.push({...doc.data(), id: doc.id})
        })
        setPlantTypes(types)
      
      })
    },[]);
    
    return plantTypes;
}
