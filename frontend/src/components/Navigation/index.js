import React from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import * as sessionActions from "../../store/session";
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: "Weston.Flatley680", password: "password" }))
    };

  const demoLogin2 = (e) => {
      e.preventDefault();
      return dispatch(sessionActions.login({ credential: "Ethyl_Upton1", password: "password" }))
  };


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <><div>
       <button onClick={demoLogin} className='login-demo-button-1' >Demo 1</button>
        <button onClick={demoLogin2} className='login-demo-button-2' >Demo 2</button>
        <LoginFormModal />
        <SignUpFormModal />
        </div>
      </>
    );
  }

  

  return (
    <div className="nav-bar-container">
        <div>
          <NavLink className="nav-bar-home-link" exact to="/"><i className="fas fa-home"></i></NavLink>
        </div>
        <div className="logo-container">
          <img alt="Jam Out Logo" src="https://jamout.s3.us-west-1.amazonaws.com/jamout.png"></img>
        </div>
        <div className="session-links">
        {isLoaded && sessionLinks}
        </div>
  
    </div>
  );
}

export default Navigation;