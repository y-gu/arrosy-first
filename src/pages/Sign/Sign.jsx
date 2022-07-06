import React, { useState, useEffect } from "react";
import "./Sign.scss";
// import InputField from "../../components/InputField/InputField";
// import Btn from "../../components/Btn/Btn";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import stains from "../../assets/stains.png";


export default function Signing() {
  const [showSignUpBox, setShowSignUpBox] = useState(false);
  const [signInStatus, setSignInStatus] = useState('show');
  useEffect(()=>(
  setSignInStatus( showSignUpBox?"hide": "show")
  ),[showSignUpBox])
  


  return (
    
    <div className="page signing">
      <div className="signIn-signUp">
        <SignIn signInStatus={signInStatus} />
        <SignUp showSignUpBox={showSignUpBox} setShowSignUpBox={setShowSignUpBox}/>
      </div>
      <div className="stain-container">
        <div className="stain" >
          <img src={stains} alt='fond' />
        </div> 
       
      </div>

    </div>
  );
}
