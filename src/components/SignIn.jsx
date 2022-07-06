import React, {useRef, useContext, useState} from "react";
import { AuthContext } from "../contexts/AuthContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export default function SignIn({signInStatus}) {
  const emailInRef = useRef();
  const passwordInRef = useRef();
  const formRef = useRef();

  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");

  const handleSignIn = async (e) =>{
    e.preventDefault()
    try{
      await signIn(emailInRef.current.value, passwordInRef.current.value);
      setValidation("");
       navigate("/user/dashboard")
      } catch(err){
       setValidation("L'émail ou mot de passe est incorrect")
    }
    formRef.current.reset();

  }


  return (
    <div className={"signIn box " + signInStatus}>
      <h3>Se connecter </h3>

      <form 
      onSubmit={handleSignIn}
      ref={formRef}
      >
      <div className="form-group">
          <FontAwesomeIcon icon={faUser} className="iconSign"/>
          <input
            ref= {emailInRef}
            id="inEmail"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
           <FontAwesomeIcon icon={faLock} className="iconSign"/>
          <input
            ref={passwordInRef}
            id="inPwd"
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            required
          />
        </div>
          <div className="validation">{validation}</div>
        <button   className='stdBtn clear '> Valider</button>
      </form>
    </div>
  );
}


