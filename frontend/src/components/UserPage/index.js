import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch}  from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import { getUser } from '../../store/users';
import { setCurrentSong } from '../../store/songs';
import 'react-h5-audio-player/lib/styles.css';
import "./UserPage.css";


const UserPage = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const user = useSelector((state) => state.users.currentUser);
    const song = useSelector((state) => state.songs.currentSong);
    
    const updateSong = (song) => {
        dispatch(setCurrentSong(song));
    }

    const handleNext = () => {
        if (user.Songs.length > 1) {
            if (song.id < user.Songs.length) {
                dispatch(setCurrentSong(user.Songs[song.id]));
            } else {
                dispatch(setCurrentSong(user.Songs[0]));
            }
        }
    }

    const handlePrev = () => {
        if (user.Songs.length > 1) {
            if (song.id > 1) {
                dispatch(setCurrentSong(user.Songs[song.id - 2]));
            } else {
                dispatch(setCurrentSong(user.Songs[user.Songs.length - 1]));
            }
        }
    }

    useEffect(() => {
        dispatch(getUser(id));
        setLoaded(true);
    }, [id, dispatch])

    if (!loaded) {
        return null;
    }

    if (user) {
        if (user.Songs.length) {
        const baseURL = user.profilephoto.split('/')[3];;
        const imageRequest = JSON.stringify({
                        bucket: "jamout",
                        key: baseURL,
                        edits: {

                            resize: {
                                width: 300,
                                height:350,
                                fit: "cover"
                            }
                        }
                    })
        const encoded = btoa(imageRequest);
        const url = `https://d31oyr2ur6cysk.cloudfront.net/${encoded}`;
    
        return (
            <div>
                <div className="user-page-profile-container">
                    <div className="user-page-profile-container-photo-container">
                        <img className="user-page-profile-container-photo" alt="User Profile Img" src={`${url}`}></img>
                    </div>
                    <div className="user-page-profile-container-information">
                        <div className="user-page-profile-container-information-username">
                            {user.username}
                        </div>
                        <div className="user-page-profile-container-information-username-divider">
                            <hr className="user-page-profile-container-information-divider"></hr>
                        </div>
                        <div className="user-page-profile-container-information-location-header">
                            Location
                        </div>
                        <div className="user-page-profile-container-information-location-divider">
                            <hr className="user-page-profile-container-information-divider"></hr>
                        </div>
                        <div className="user-page-profile-container-information-location">
                            {user.city}, {user.state} &nbsp; {user.zip}
                        </div>
                        <div className="user-page-profile-container-information-instruments-header">
                            Instruments
                        </div>
                        <div className="user-page-profile-container-information-instruments-divider">
                            <hr className="user-page-profile-container-information-divider"></hr>
                        </div>
                        <div className="user-page-profile-container-information-instruments">
                            {user.Instruments.map((isntrument, i = 0) => {
                                if (i < user.Instruments.length - 1) {
                                    i++;
                                    return (<span>{isntrument.name} • </span>);
                            
                                } else {
                                    return (<span>{isntrument.name} </span>)
                                }
                            })}
                        </div>
                        <div className="user-page-profile-container-information-genres-header">
                            Genres
                        </div>
                        <div className="user-page-profile-container-information-genres-divider">
                            <hr className="user-page-profile-container-information-divider"></hr>
                        </div>
                        <div className="user-page-profile-container-information-genres">
                            {user.Genres.map((genre, i = 0) => {
                                if (i < user.Genres.length - 1) {
                                    i++;
                                    return (<span>{genre.name} • </span>);
                            
                                } else {
                                    return (<span>{genre.name} </span>)
                                }
                            })}
                        </div>
                        <div className="user-page-profile-container-information-bio-header">
                            Bio
                        </div>
                        <div className="user-page-profile-container-information-bio-divider">
                            <hr className="user-page-profile-container-information-divider"></hr>
                        </div>
                        <div className="user-page-profile-container-information-bio">
                            {user.bio}
                        </div>
                    </div>
                </div>
                <div className="audio-player-container">
                    <div className="audio-player-container-header">{user.username}'s Recordings</div>
                    <hr className="audio-player-container-header-divider"></hr>
                    {user.Songs.length && <div className="now-playing">{song ? 'Now Playing: ' +  song.title : null}</div>}
                    { user.Songs.length && 
                        <AudioPlayer 
                            onClickNext={song ? handleNext : null} 
                            onClickPrevious = {song ? handlePrev : null}
                            showSkipControls={true}
                            src={song ? song.url : song} 
                            className="audio-player"
                        />
                    }
                    <div className="song-container-song-list">
                    {user.Songs.length && user.Songs.map((song) => {
                            return (<div className="song-container-song-title" onClick={(() => updateSong(song))}>{song.title}</div>)
                        }
                    )}
                    </div>
                </div>
            </div>
        )
    }
    } else {
        return null;
    }

}

export default UserPage;