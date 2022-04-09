import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/Image/logo.png";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const auth = getAuth();
const Navbar = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
          if (user) {
            // const uid = user.uid;
            setUser(user);
          } else {
            setUser({});
          }
        });
    }, [])

    const handleSignOut = () => {
      signOut(auth).then(() => {

        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });

    }

    return (
      <nav
        style={
          pathname.includes("blog") ? { display: "none" } : { display: "flex" }
        }
      >
        <div className='logo-container'>
          <img src={Logo} alt='' />
        </div>
        <div className='link-container'>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "link")}
            to='/'
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "link")}
            to='/videos'
          >
            Videos
          </NavLink>
          {user?.uid ?
            <button className="logout-button" onClick={handleSignOut}>Logout</button>

            : <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "link")}
              to='/login'
            >
              Login
            </NavLink>}
            <span className="margin-left">
              {user?.displayName ?  user.displayName : user.email}
            </span>
        </div>
      </nav>
    );
  };

  export default Navbar;
