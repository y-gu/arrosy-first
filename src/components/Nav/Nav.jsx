import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import "./Nav.scss";
import { Link, NavLink } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";

export default function Nav() {
  const mobile = useMobile();
  const [dropMenu, setDropMenu] = useState(false);
  const { currentUser, logOut } = useContext(AuthContext);

  const handleToggle = () => {
    setDropMenu(!dropMenu);
  };

  const logOutMobile = () => {
    handleToggle();
    logOut();
  };
  const activeToggle = (isActive) => {
    const className = isActive ? "active" : "inactive";
  };
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
                className="iconCloseDrop"
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
                    <Link to="/signing" onClick={handleToggle}>
                      Entrer
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <>
                  <li>  <Link to="/user/garden" onClick={handleToggle}>Jardin</Link></li>
                  <li> <Link to="user/profile" onClick={handleToggle}>Profil</Link></li>
                  
                  <li>
                    <p onClick={logOutMobile}>LOGOUT</p>
                  </li>
                  </>
                )}
              </ul>
            </div>
          ) : (
            <div>
              {currentUser ? (
                <div className="iconRoundGreen" onClick={handleToggle}>
                  <FontAwesomeIcon icon={faBars} />
                </div>
              ) : (
                <div>
                  {" "}
                  <Link to="/signing" className="iconRoundGreen">
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="menu">
          <ul>
            {!currentUser && (
              <>
                <li>
                  <NavLink to="/" className={activeToggle()}>
                    Accueil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="signing" className="navIcon iconRoundGreen">
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                  </NavLink>
                </li>
              </>
            )}
            {currentUser && (
              <>
                <li>
                  <NavLink to="/user/dashboard">Accueil</NavLink>
                </li>
                <li>
                  <NavLink to="/user/garden">Jardin</NavLink>
                </li>
                <li>
                  <NavLink to="user/profile">Profil</NavLink>
                </li>
                <li>
                  <div className="navIcon iconRoundGreen" onClick={logOut}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
