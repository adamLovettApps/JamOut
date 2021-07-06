import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import DeleteProfileModal from "../DeleteProfile";

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
  };

  return (
    <>
      <button className="nav-action-button" onClick={openMenu}>
        <i class="fas fa-bars"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="profile-link-dropdown">
            <Link className="profile-link-dropdown-nav" to={`/users/${user.id}`}>Your Profile</Link>
          </div>
          <div className="log-out-dropdown" onClick={logout}>
            <Link className="log-out-dropdown-nav" to="/">Log Out</Link>
          </div>
          <div className="delete-profile-dropdown">
            <Link className="delete-profile-dropdown-nav" to={`/deleteProfile/`}>Delete Profile</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
