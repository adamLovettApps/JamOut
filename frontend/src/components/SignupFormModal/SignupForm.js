import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getGenres } from "../../store/genres";
import { getInstruments } from "../../store/instruments";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const genres = useSelector((state) => state.genres.all)
  const instruments = useSelector((state) => state.instruments.all)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chosenInstruments, setChosenInstruments] = useState([]);
  const [chosenGenres, setChosenGenres] = useState([]);
  
  useEffect(() => {
      dispatch(getGenres());
      dispatch(getInstruments());
      setIsLoaded(true);
  }, [dispatch])

  if (sessionUser) return <Redirect to="/" />;


  if (!isLoaded) {
    return null;
  }
  const updateFile = (e) => {
    const file = e.target.files[0];
    const box = document.getElementById('file-input-label');
    box.innerText = "Photo Chosen";
    box.style.backgroundColor = "#C1681F";
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, city, state, zip, bio, image, chosenInstruments, chosenGenres }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleInstruments = (e) => {
    const chosen = Array.from(e.target.selectedOptions, option => option.value);
    setChosenInstruments([chosen]);
  }

  const handleGenres = (e) => {
    const chosen = Array.from(e.target.selectedOptions, option => option.value);
    setChosenGenres([chosen]);
  }

  return (
    <div className="sign-up-form-container">
      <div className="sign-up-form-header">Sign Up</div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-field-input-container">
          
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder = "Email"
            required
            className="form-field-input"
          />
        </div>
        <div className="form-field-input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="form-field-input"
          />
        </div>
        <div className="form-field-input-container">
        
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
            className="form-field-input"
          />
        </div>
        <div className="form-field-input-container">
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
            className="form-field-input"
          />
        </div>
        <div className="form-field-input-container">
        
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Zip Code"
            required
            className="form-field-input"
          />
        </div>
        <div className="form-field-input-container">

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Biography"
            required
            className="form-field-textarea"
          />
        </div>
        <div className="form-field-input-container">
          
          <input
            type="password"
            value={password}
            id="file"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="form-field-input"
          />
        </div>
        <div className="form-field-input-container">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="form-field-input"
          />
        </div>
        <div className="form-field-input-container-multi">
        <div className="sign-up-multi-select-label"><label>Instruments Played</label></div>
        <div><select className="sign-up-multi-select" name="instruments" multiple onChange={handleInstruments}>
          {instruments.map((instrument) => (<option value={instrument.id}>{instrument.name}</option>))}
      
        </select>
        </div>
        </div>
        <div className="form-field-input-container-multi">
        <div className="sign-up-multi-select-label"><label>Genres Played</label></div>
        <div className="sign-up-multi-select-container"><select className="sign-up-multi-select" name="genres" multiple onChange={handleGenres}>
          {genres.map((genre) => (<option value={genre.id}>{genre.name}</option>))}
        </select>
        </div>
        </div>
        
        
        <div className="file-container">
        <label className="file-input-label" for="file-input" id="file-input-label">Profile Photo</label>
          <input type="file" id="file-input-box" accept="image/*" onChange={updateFile} />
        </div>
        <div className="form-field-button-container">
        <button type="submit" className="form-field-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
