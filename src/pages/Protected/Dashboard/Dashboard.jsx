import React,{useContext} from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Dashboard() {
  const {currentUser} = useContext(AuthContext);
  return (
    <div> <p>SALUT{currentUser.uid}</p>
    <div>Currently logged in as :{currentUser?.uid}</div>
    </div>
  )
}
