import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import SearchBar from "../SearchBar";
import SearchResultCard from './SearchResultCard';
import { getAllFavorites } from '../../store/favorites';
import "./Favorites.css"
import { useParams } from 'react-router';

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        dispatch(getAllFavorites(user.id))
    }, [dispatch, user.id]);

    if (!isLoaded) {
        return null;
    }
    
    if (favorites && favorites.length) {
        return (
            <div className="search-results-found-container">
                <div className="search-bar-container-non-splash"><SearchBar></SearchBar></div>
                <div className="search-result-header">Your Favorites
                </div>
                <hr className="search-result-header-divider"></hr>

                <div className="search-result-container">
                    <div>&nbsp;</div>
                    <div className="search-result-cards-container">
                        {favorites.map((favorite, i=0) => <><SearchResultCard user={favorite.userInformation}></SearchResultCard> { i<favorites.length -1 && <hr className="search-results-cards-divider"></hr>}</>)}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
        
            <div>
                <div className="search-bar-container-non-splash"><SearchBar></SearchBar></div>
                    <div className="search-result-header">Your Favorites
                    </div>
                    <hr className="search-result-header-divider"></hr>

                    <div className="search-result-container">
                        <div>&nbsp;</div>
                        <div className="favorites-no-result">You don't have any favorites yet. Why don't you add some?</div>
                    </div>
            </div>
        )
    }
}

export default Favorites;