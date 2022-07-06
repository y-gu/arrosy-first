import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

export default function Protected() {
    const {currentUser}= useContext(AuthContext);
    if(!currentUser){
        return <Navigate to="/"/>
    }
  return (
    <div>
        <Outlet/>
    </div>
  )
}
