import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGenres } from '../../store/genres';
import { getInstruments } from '../../store/instruments';
import { getSearchResults, setSearchResults } from '../../store/search';
import './SearchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres.all)
    const instruments = useSelector((state) => state.instruments.all)
    const [zip, setZip] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [chosenInstruments, setChosenInstruments] = useState([]);
    const [chosenGenres, setChosenGenres] = useState([]);
    const [radius, setRadius] = useState(1);

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getInstruments());
        setIsLoaded(true);
    }, [dispatch])

    if (!isLoaded) {
        return null;
    }

    const handleInstruments = (e) => {
        const chosen = Array.from(e.target.selectedOptions, option => option.value);
        setChosenInstruments([chosen]);
    }

    const handleGenres = (e) => {
        const chosen = Array.from(e.target.selectedOptions, option => option.value);
        setChosenGenres([chosen]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getSearchResults(chosenInstruments, chosenGenres, zip, radius));
        history.push("/searchresults");
    }



    return (
        <form className="search-bar-container" onSubmit={handleSubmit}>
            <div>
                <select className="search-multi-select" name="instruments" multiple onChange={handleInstruments}>
                {instruments.map((instrument) => (<option id={instrument.id} value={instrument.id}>{instrument.name}</option>))}
                </select>
            </div>
            <div>

                <select className="search-multi-select" name="genres" multiple onChange={handleGenres}>
                {genres.map((genre) => (<option id={genre.id} value={genre.id}>{genre.name}</option>))}
                </select>
        
            </div>
            <div className="form-field-input-container-search">
        
                <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Zip Code"
                    required
                    className="form-field-input-search"
                />
            </div>
            <div className="form-field-input-container-search">
                <select className="search-select" value={radius} onChange={(e) => setRadius(e.target.value)}>
                    <option value="1">1 Mile</option>
                    <option value="3">3 Miles</option>
                    <option value="5">5 Miles</option>
                    <option value="10">10 Miles</option>
                    <option value="15">15 Miles</option>
                    <option value="25">25 Miles</option>
                    <option value="50">50 Miles</option>
                    <option value="any">Any</option>
                </select>
            </div>
            <div className="form-field-button-container">
                <button type="submit" className="form-field-button-search">Search</button>
            </div>
        </form>
    )
}

export default SearchBar;
