import {useState} from 'react';
import { storage } from '../firebase/config'
import { ref, getDownloadURL } from "firebase/storage";


const useStorage = (fileName) => {
    const [imgUrl, setImgUrl]= useState();
    let storageRef = ref(storage, `plants/${fileName}.png`);
   
    getDownloadURL(storageRef)
    .then((url) => {
      setImgUrl(url)
    })
    .catch((error) => {
     console.log(error)
    });
    return imgUrl;
}

export default useStorage;