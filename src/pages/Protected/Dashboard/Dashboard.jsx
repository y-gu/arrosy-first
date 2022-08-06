
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import useStorage from '../../../hooks/useStorage';

export default function Dashboard() {
  const url = useStorage('monstera')

  const { currentUser } = useContext(AuthContext);
  return (
    <div> <p>SALUT{currentUser.uid}</p>
      <div>Currently logged in as :{currentUser?.uid}</div>
      <img src={url} alt="" />
    </div>
  )
}
