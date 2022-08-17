import {useState, useEffect} from 'react';
import { storage } from '../firebase/config'
import { ref, getDownloadURL } from "firebase/storage";


const useStorage = (collectionName, fileName) => {
    const [imgUrl, setImgUrl]= useState();
    let storageRef = ref(storage, `${collectionName}/${fileName}.png`);

    useEffect(()=>{
    getDownloadURL(storageRef)
    .then((url) => {
      setImgUrl(url)
    })
    .catch((error) => {
     console.log(error)
    });
  },[fileName])

    return imgUrl;
}

export default useStorage;

