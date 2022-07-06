import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { allUsers } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

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
      await setDoc(docRef, { name: name, email: email });
    
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        message = "The email address is already in use";
      } else if (error.code === "auth/invalid-email") {
        message = "The email address is not valid.";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "Operation not allowed.";
      } else if (error.code === "auth/weak-password") {
        message = "The password is too weak.";
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

  console.log(loadingData);

  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn, logOut }}>
      {!loadingData && props.children}
    </AuthContext.Provider>
  );
}
