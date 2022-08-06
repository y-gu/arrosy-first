import {useState, useEffect} from 'react';
import { allUsers } from '../firebase/config';
import { auth } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';



export default function useUserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading ] = useState(true);
    const [categories, setCategories]= useState([]);

    const userRef = doc(allUsers,auth.currentUser.uid);

    useEffect(() => {  
       const unsub = onSnapshot(userRef, (doc)=>{
         setUserInfo(doc.data())
         setCategories(doc.data().categories)
          setLoading(false)
         }) 

       
         return ()=>unsub()
      },[auth.currentUser]);
  
    return {userInfo, categories, loading};
}
