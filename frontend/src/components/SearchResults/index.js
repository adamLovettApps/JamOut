import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { restoreSearchResults } from '../../store/search';
import SearchBar from "../SearchBar";
import SearchResultCard from './SearchResultCard';
import "./SearchResults.css"
const SearchResults = () => {
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);
    const searchParameters = useSelector((state) => state.search.searchParameters)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, [dispatch, searchParameters]);

    if (!isLoaded) {
        return null;
    }
    
    if (results && results.length) {
        return (
            <div className="search-results-found-container">
                <div className="search-bar-container-non-splash"><SearchBar></SearchBar></div>
                <div className="search-result-header">Search Results
                </div>
                <hr className="search-result-header-divider"></hr>

                <div className="search-result-container">
                    <div>&nbsp;</div>
                    <div className="search-result-cards-container">
                        {results.map((result, i=0) => <><SearchResultCard user={result}></SearchResultCard> { i<results.length -1 && <hr className="search-results-cards-divider"></hr>}</>)}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
        
            <div>
                <div className="search-bar-container-non-splash"><SearchBar></SearchBar></div>
                    <div className="search-result-header">Search Results
                    </div>
                    <hr className="search-result-header-divider"></hr>

                    <div className="search-result-container">
                        <div>&nbsp;</div>
                        <div className="search-result-no-result">Sorry, no users match your search criteria.</div>
                    </div>
            </div>
        )
    }
}

export default SearchResults;