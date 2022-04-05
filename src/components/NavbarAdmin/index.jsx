import React, {useState, useContext}  from 'react';
import './styles.css';
import { SessionContext, Session, UserSession } from '../../session';
import { deleteCookie } from '../../cookie';
//import { Link } from 'react-router-dom/match';

function NavbarAdmin() {
    const [active, setActive] = useState("nav__menu");
    const [icon, setIcon] = useState("nav__toggler");

    const { session, setSession } = useContext (SessionContext);


    const navToggle = () => {
      if (active === "nav__menu") {
        setActive("nav__menu nav__active");
      } else setActive("nav__menu");
  
      // Icon Toggler
      if (icon === "nav__toggler") {
        setIcon("nav__toggler toggle");
      } else setIcon("nav__toggler");
    };

    
    const logout = () => {
      setSession(null);
      deleteCookie('admin_credentials');
    };


    return (
      <nav className="nav">
        <a href="/" className="nav__brand">
          recipe app
        </a>
        <ul className={active}>
          <li className="nav__item">
            <a href="/" className="nav__link">
              Home
            </a>
          </li>
          <li className="nav__item">
            <a href="/" className="nav__link">
              Contact
            </a>
          </li>
          <li className="nav__item">
            <a href="/users" className="nav__link">
              Users
            </a>
          </li>
          <li className="nav__item">
            <a href="/logStart" className="nav__link" onClick={logout}>
              Log Out
            </a>
          </li>
          
        </ul>
        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    );
  }

export default NavbarAdmin;