import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResultCard.css';

const SearchResultCard = ({user}) => {
    if (user) {
        const baseURL = user.profilephoto.split('/')[3];
            const imageRequest = JSON.stringify({
                            bucket: "jamout",
                            key: baseURL,
                            edits: {

                                resize: {
                                    width: 200,
                                    height:200,
                                    fit: "cover"
                                }
                            }
                        })
            const encoded = btoa(imageRequest);
            const url = `https://d31oyr2ur6cysk.cloudfront.net/${encoded}`;
        return (
            <Link className="search-result-link" to={`/users/${user.id}`}>
            <div className="search-result-single-card-container">
                <div className="search-result-single-card-container-image"><img className="search-result-single-card-container-image-img" alt="User Profile" src={url}></img></div>
                <div className="search-result-single-card-container-information">
                    <div className="search-result-single-card-container-information-username">{user.username} </div>
                    <div className="search-result-single-card-container-information-location">{user.city}, {user.state} &nbsp; {user.zip} </div>
                    <div className="search-result-single-card-container-information-instruments"> 
                        {user.Instruments.map((isntrument, i = 0) => {
                            if (i < user.Instruments.length - 1) {
                                i++;
                                return (<span>{isntrument.name} • </span>);
                        
                            } else {
                                return (<span>{isntrument.name} </span>)
                            }
                        })}
                    </div>
                    <div className="search-result-single-card-container-information-genres"> 
                        {user.Genres.map((genre, i = 0) => {
                            if (i < user.Genres.length - 1) {
                                i++;
                                return (<span>{genre.name} • </span>);
                        
                            } else {
                                return (<span>{genre.name} </span>)
                            }
                        })}
                    </div>
                    <div className="search-result-single-card-container-information-distance">{user.userdistance} miles away</div>
                </div>
            </div>
            </Link>
        )
        }
    else {
        return null;
    }
};


export default SearchResultCard;