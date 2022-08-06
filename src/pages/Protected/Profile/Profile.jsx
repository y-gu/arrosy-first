import React,{useContext} from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import useUserInfo from '../../../hooks/useUserInfo'
import plants_line from '../../../assets/plants_line.png';
function Profile() {
    const {currentUser} = useContext(AuthContext);
    const {userInfo} = useUserInfo()
    return (
      <div> 
        <h1>Profil</h1>
        <img src={plants_line} style={{height: "20rem"}}/>
      <p>{userInfo.userName}</p>
      <p>{userInfo.email}</p>
      
      <div>Currently logged in as :{currentUser?.uid}</div>
      </div>
    )
}

export default Profile




