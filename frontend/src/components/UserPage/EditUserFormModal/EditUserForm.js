import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGenres } from "../../../store/genres";
import { getInstruments } from "../../../store/instruments"
import { getNewUserInformation } from "../../../store/users";
import './EditUserForm.css';

function EditUserForm({setShowModal}) {
  const dispatch = useDispatch();
  const {id} = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const genres = useSelector((state) => state.genres.all);
  const instruments = useSelector((state) => state.instruments.all);
  const currentUser = useSelector((state) => state.users.currentUser);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chosenInstruments, setChosenInstruments] = useState([]);
  const [chosenGenres, setChosenGenres] = useState([]);
  const previousChosenGenres = currentUser.Genres.map((genre) => genre.id);
  const previousChosenInstruments = currentUser.Instruments.map((instrument) => instrument.id);
  
  useEffect(() => {
      dispatch(getGenres());
      dispatch(getInstruments());
      setCity(currentUser.city);
      setState(currentUser.state);
      setZip(currentUser.zip);
      setBio(currentUser.bio);
      
      console.log(previousChosenGenres, "PREV")
      setChosenGenres(previousChosenGenres);
      setChosenInstruments(previousChosenInstruments);
      setIsLoaded(true);

  }, [dispatch])



  if (!isLoaded) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNewUserInformation(id, city, state, zip, bio, chosenInstruments, chosenGenres));
    setShowModal(false);
    // if (password === confirmPassword) {
    //   setErrors([]);
      
    // }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
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
      <div className="sign-up-form-header">Edit Your Profile</div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
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
        {/* <div className="form-field-input-container">
          
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
        </div> */}
        <div className="form-field-input-container-multi">
        <div className="sign-up-multi-select-label"><label>Instruments Played</label></div>
        <div><select className="sign-up-multi-select" name="instruments" multiple onChange={handleInstruments}>
          {instruments.map((instrument) => (<option value={instrument.id} selected={previousChosenInstruments.includes(instrument.id)}>{instrument.name}</option>))}
      
        </select>
        </div>
        </div>
        <div className="form-field-input-container-multi">
        <div className="sign-up-multi-select-label"><label>Genres Played</label></div>
        <div className="sign-up-multi-select-container"><select className="sign-up-multi-select" name="genres" multiple onChange={handleGenres}>
          {genres.map((genre) => (<option value={genre.id} selected={previousChosenGenres.includes(genre.id)}>{genre.name}</option>))}
        </select>
        </div>
        </div>
        
        
        <div className="form-field-button-container">
        <button type="submit" className="form-field-button">Edit Profile</button>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
