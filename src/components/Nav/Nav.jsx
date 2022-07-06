import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import "./Nav.scss";
import { Link } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark,  faArrowRightFromBracket, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";

export default function Nav() {
  const mobile = useMobile();
  const [dropMenu, setDropMenu] = useState(false);
  const { currentUser,logOut } = useContext(AuthContext);

  const handleToggle = () => {
    setDropMenu(!dropMenu);
  };

  const logOutMobile = ()=>{
    handleToggle()
    logOut();
  }
  return (
    <div className="nav">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
    
      {mobile ? (
        <div className="mobileNav">
          {dropMenu ? (
            <div className="dropMenu ">
              <FontAwesomeIcon
                className="navIcon iconClose"
                icon={faXmark}
                onClick={handleToggle}
              />
              <ul>
                <li>
                  <Link to="/" onClick={handleToggle}>
                    Accueil
                  </Link>
                </li>
                {!currentUser && (
              <li>
                <Link to="/signing" onClick={handleToggle}>Entrer</Link>
              </li>
            )}
            {currentUser && 
            (
              <li>
               <p onClick={logOutMobile} >LOGOUT</p>
              </li>
            )
            }
              </ul>
            </div>
          ) : (
           <div>
            {currentUser?
            (
            
            <div className="navIcon iconRound" onClick={handleToggle}>
              <FontAwesomeIcon icon={faBars} />
            </div>):
            (<div> <Link to="/signing" className="navIcon iconRound" >
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            </Link></div>)}
            </div>
          )}
        </div>
      ) : (
        <div className="menu">
          <ul>
 
            {!currentUser && (
              <>
            <li>
              <Link to="/">Accueil</Link>
            </li>
              <li>
                <Link to="/signing" className="navIcon iconRound" >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                </Link>
              </li>
              </>
            )}
            {currentUser && 
            (
              <>
           <li>
              <Link to="/user/dashboard">Accueil</Link>
            </li>
              <li>
                <div   className="navIcon iconRound"  onClick={logOut}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </div>
              </li>
              </>
            )
            }
          </ul>
        </div>
      )}
    </div>
  );
}
