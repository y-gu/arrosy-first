
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {getFirestore, collection, onSnapshot, addDoc, doc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);


// DB

export const firestore = getFirestore();
export const allUsers = collection(firestore, "users")


// export  let users = [];
// onSnapshot(allUsers, (snapshot) => {
      
//         snapshot.docs.forEach((doc) => {
//           users.push({ id: doc.id, ...doc.data() });
// })

// })



// AUTH
export const auth = getAuth(app);

// export function signUp(name, email, password){
//  createUserWithEmailAndPassword(auth, email, password).
//  //add user to database
//  then( async (userCredential)=>{
//   const user = userCredential.user
//   console.log("cest " + user.uid)
//   try{
//     const docRef =  doc(allUsers, user.uid)
//     await setDoc( docRef, {name: name, email: email})
//   }catch(e){
//     console.error("Error adding document: ", e)
//   }
//  })
// }

// export function  signIn(email, password){
//   return signInWithEmailAndPassword(auth, email, password)
// }
// export function logOut(){
//   signOut(auth)
// }

