import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import DeleteProfileModal from "../DeleteProfile";
import { setCurrentConversation } from "../../store/conversations";
import { setDisplay } from "../../store/messages";

import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(setCurrentConversation(null));
    dispatch(setDisplay("none"));

  };

  return (
    <div className="action-button-container">
      <button className="nav-action-button" onClick={openMenu}>
        <i className="fas fa-bars"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="profile-link-dropdown">
            <Link  to={`/users/${user.id}`}><button className="profile-link-dropdown-nav">Your Profile</button></Link>
          </div>
          <div className="favorites-dropdown">
            <Link to={`/favorites/`}><button className="favorites-dropdown-nav">Your Favorites</button></Link>
          </div>
          <div className="log-out-dropdown" onClick={logout}>
            <Link to="/"><button className="log-out-dropdown-nav">Log Out</button></Link>
          </div>
          <div className="delete-profile-dropdown">
            <Link to={`/deleteProfile/`}><button className="delete-profile-dropdown-nav" >Delete Profile</button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
