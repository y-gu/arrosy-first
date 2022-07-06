import React, { useRef, useState , useContext} from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function SignUp({showSignUpBox, setShowSignUpBox}) {

  const nameRef = useRef()
  const emailRef = useRef();
  const pwdRef = useRef();
  const pwdConfirmRef = useRef();
  const formRef = useRef();


  const {signUp} = useContext(AuthContext);
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

  // Signing Up

  const handleSignUp = async (e) =>{ 
    e.preventDefault()
    setValidation("");
    if((pwdRef.current.value.length|| pwdConfirmRef.current.value.length)<6){
      setValidation("Le mot de passe doit contenir 6 caractères minimum ")
      return
    }
     if(pwdRef.current.value !== pwdConfirmRef.current.value){
      setValidation("Les mots de passe saisis ne correspondent pas")
      return
    }  
      const message = await signUp(nameRef.current.value, emailRef.current.value, pwdRef.current.value);
      formRef.current.reset();
      setValidation(message)
      if(message==""){
        navigate('/user/dashboard')
      }
  }


//Show & Hide the form
const [boxStatus, setStatus] = useState("hide");
const handleShowBox = ()=>{
  setShowSignUpBox( prevStatus => !prevStatus);
  setValidation("");
}
useEffect(()=>{
  setStatus(showSignUpBox?"show": "hide")
 },[showSignUpBox])

  return (

    <div className="signUp box">
      <h3 onClick={handleShowBox} className={showSignUpBox? "hide" :""}>Viens d'arriver? </h3>
      <h3 className={!showSignUpBox? "hide" :""}>S'enregistrer </h3>
      <div className={"box-content "+ boxStatus}> 
       <FontAwesomeIcon icon={faArrowLeft} className="back" onClick={handleShowBox}/>
      <form
       onSubmit={handleSignUp}
       ref={formRef} 
       >
     
        <div className="form-group">
          <label htmlFor="name" style={{ color: "rgb(77, 116, 119)"}}>
            Nom
          </label>
          <input
            ref= {nameRef}
            id="name"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" style={{ color: "rgb(77, 116, 119)"}}>
           Email
          </label>
          <input
            ref= {emailRef}
            id="email"
            className="form-control"
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="pwd" style={{ color: "rgb(77, 116, 119)"}}>
            Mot de passe
          </label>
          <input
            ref={pwdRef}
            id="pwd"
            type="password"
            className="form-control"
            required
          />
        </div>



        <div className="form-group">
          <label htmlFor="pwdConfirm" style={{ color: "rgb(77, 116, 119)"}}>
          Confirmer le mot de passe
          </label>
          <input
            ref={pwdConfirmRef}
            id="pwdConfirm"
            type="password"
            className="form-control"
            required
          />
        </div>
        <div className="validation">{validation}</div>
        <button  className='stdBtn dark '>Valider</button>
      </form>
      </div>
    </div>

  );
}

