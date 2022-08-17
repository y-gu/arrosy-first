
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import useStorage from '../../../hooks/useStorage';
import useStorageCollection from '../../../hooks/useStorageCollection';
import { storage } from '../../../firebase/config'
import { ref, getDownloadURL } from "firebase/storage";

export default function Dashboard() {

  const url = useStorage( 'plants', 'monstera');
console.log(url)
  const pots= useStorageCollection('pots')
  
  console.log(pots)
  const { currentUser } = useContext(AuthContext);
  return (
    <div> <p>SALUT{currentUser.uid}</p>
      <div>Currently logged in as :{currentUser?.uid}</div>
     <img src={url} alt="" />
      {pots.map( (item)=>{
        <img src={item} alt="" />
      })}

    </div>
  )
}
