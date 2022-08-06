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
      {/* <div style={{height:"4.5rem", width:"6rem", background:"#4d7477", position:"absolute", left:"5rem", top:"3rem", borderRadius:"60%"}}></div> */}
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      {mobile ? (
        <div className="mobileNav">
          {dropMenu ? (
            <div className="dropMenu ">
              <FontAwesomeIcon
                className="iconClose"
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
                  <li>
                    <p onClick={logOutMobile}>LOGOUT</p>
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div>
              {currentUser ? (
                <div className="iconRound" onClick={handleToggle}>
                  <FontAwesomeIcon icon={faBars} />
                </div>
              ) : (
                <div>
                  {" "}
                  <Link to="/signing" className="iconRound">
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
                  <NavLink to="signing" className="navIcon iconRound">
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
                  <div className="navIcon iconRound" onClick={logOut}>
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
