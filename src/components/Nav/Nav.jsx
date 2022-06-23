import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import "./Nav.scss";
import { Link } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const mobile = useMobile();
  const [dropMenu, setDropMenu] = useState(false);

  const handleToggle = () => {
    setDropMenu(!dropMenu)  
  };
  return (
    <div className="nav">
      <Link to="/">
        <img className="logo" src={logo} />
      </Link>

      {mobile ? (
        <div className="mobileNav">
          {dropMenu ? (
            <div className="dropMenu "  >
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
                <li>
                  <Link to="/signing" onClick={handleToggle}>
                    Entrer
                  </Link>
                </li>
              </ul>
            </div>
          )
        :
       
          <div className="navIcon iconBars" onClick={handleToggle}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        
        }
        </div>
      ) : (
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/signing">Entrer</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
