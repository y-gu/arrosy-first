// import { useState, useEffect } from 'react';
// import { storage } from '../firebase/config'
// import { ref, getDownloadURL, list, listAll } from "firebase/storage";



// const useStorageCollection = (collectionName) => {


 
//     // const [collection, setCollection] = useState(['aaa'])
//     const collection= []
//     useEffect(()=>{

//         const listRef = ref(storage, `${collectionName}/`);
//         listAll(listRef)
//         .then((res) => {
//           res.prefixes.forEach((folderRef) => {
//               // All the prefixes under listRef.
//               // You may call listAll() recursively on them.
//           });
//           res.items.forEach((itemRef) => {
//             getDownloadURL(ref(storage, `${itemRef}`))
//             .then((downloadURL) => {
//               console.log(downloadURL);
//                 // setCollection((prevCollection)=>[
//                 //   ...prevCollection,
//                 //   downloadURL
//                 // ])
//                 collection.push(downloadURL)
              
//             });
//           })
         
//       })


//   },[])

//     return collection
// }

// export default useStorageCollection;




