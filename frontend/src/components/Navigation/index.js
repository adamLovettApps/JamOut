import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignUpFormModal />
      </>
    );
  }

  return (
    <div className="nav-bar-container">
        <div>
          <NavLink className="nav-bar-home-link" exact to="/"><i class="fas fa-home"></i></NavLink>
        </div>
        <div className="logo-container">
          <img alt="Jam Out Logo" src="https://jamout.s3.us-west-1.amazonaws.com/jamout.png"></img>
        </div>
        <div>
        {isLoaded && sessionLinks}
        </div>
  
    </div>
  );
}

export default Navigation;