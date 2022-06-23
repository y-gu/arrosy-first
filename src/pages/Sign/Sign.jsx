import React,{useRef} from 'react';
import './Sign.scss'
import InputField from '../../components/InputField/InputField';
import Btn from '../../components/Btn/Btn';


export default function Signing() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef();

  function handleSubmit(e){
   // signup(emailRef.current.value, passwordRef.current.value)
  }

  return (
    <div className='page signing'>
         <h3 className='enter'> Entre dans ton jardin</h3>
        <div className="signIn-signUp">
            <div className='signIn box'>
              <h3>Tu as déjà un compte ?</h3>
              <form >
                <InputField name="email" color="white">Email</InputField>
                <InputField name="password" color="white">Mot de passe</InputField>
                <Btn type="submit" colorScheme="clear">Se connecter</Btn>
              </form>
            </div>
            <div className='signUp box'>
            <h3>Viens d'arriver?</h3>
              <form onSubmit={handleSubmit}>
              <InputField name="firstname" ref={nameRef} color="rgb(77, 116, 119)">Prénom</InputField>
              <InputField name="email" ref={emailRef} color="rgb(77, 116, 119)">Email</InputField>
              <InputField name="password" ref={passwordRef} color="rgb(77, 116, 119)">Mot de passe</InputField>
              <InputField name="confirmPassword" ref={passwordConfirmationRef} color="rgb(77, 116, 119)">Confirmer le mot de passe</InputField>
              <Btn type="submit" colorScheme="dark">Se connecter</Btn>
              </form>
            </div>
        </div>

    </div>
  )
}
