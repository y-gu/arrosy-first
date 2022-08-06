import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { allUsers } from "../firebase/config";
import { doc, setDoc, serverTimestamp} from "firebase/firestore";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
 
  let message = "";
  async function signUp(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); 
      //add user to database
      const user = userCredential.user;
      const docRef = doc(allUsers, user.uid);
      await setDoc(docRef, { userName: name, email: email, timestamp: serverTimestamp()});
    
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        message = "Cet émail est déjà utilisé";
      } else if (error.code === "auth/invalid-email") {
        message = "Le format de cet adresse émail n'est pas valide";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "L'operation n'est pas autorisé";
      } else if (error.code === "auth/weak-password") {
        message = "Le mode passe doit contenir au moins 6 caractères";
      }
    }

    return message;
  }



  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    signOut(auth);
  }

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingData(false);
    });
    return unsubscribe;
  }, []);



  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn, logOut }}>
      {!loadingData && props.children}
    </AuthContext.Provider>
  );
}
