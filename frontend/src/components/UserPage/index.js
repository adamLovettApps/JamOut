import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch}  from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import { getUser, removeASong } from '../../store/users';
import { setCurrentSong } from '../../store/songs';
import AddSongForm from './AddSongForm';
import EditUserFormModal from './EditUserFormModal';
import SearchBar from '../SearchBar';
import { setCurrentConversation } from '../../store/conversations';
import { setDisplay } from '../../store/messages';
import 'react-h5-audio-player/lib/styles.css';
import "./UserPage.css";


const UserPage = ({socket}) => {

    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const user = useSelector((state) => state.users.currentUser);
    const loggedUser = useSelector((state) => state.session.user);
    const song = useSelector((state) => state.songs.currentSong);
    
    const updateSong = (song) => {
        dispatch(setCurrentSong(song));
    }

    const handleNext = () => {
        if (user.Songs.length > 1) {
            const index = user.Songs.indexOf(song)
            if (index < user.Songs.length -1) {
                dispatch(setCurrentSong(user.Songs[index + 1]));
            } else {
                dispatch(setCurrentSong(user.Songs[0]));
            }
        }
    }

    const handlePrev = () => {
        if (user.Songs.length > 1) {
            const index = user.Songs.indexOf(song)
            if (index > 0) {
                dispatch(setCurrentSong(user.Songs[index - 1]));
            } else {
                dispatch(setCurrentSong(user.Songs[user.Songs.length - 1]));
            }
        }
    }

    const deleteSong = (e, songId) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(removeASong(id, songId));
        if (song) {
            if (song.id === songId) {
                dispatch(setCurrentSong(""));
            }
        }
    }

    useEffect(() => {
        dispatch(getUser(id));
        setLoaded(true);
    }, [id, dispatch])

    const setActiveConvo = async () => {
        const res = await fetch(`/api/conversations/${user.id}/${loggedUser.id}`);
        const data = await res.json();
        const { id, newConvo} = data;
        if (newConvo) {
            socket.emit('new', id);
        }
        dispatch(setCurrentConversation(id));
        dispatch(setDisplay("inline"));
    }

    if (!loaded) {
        return null;
    }

    if (user) {
        if (user.Songs.length) {
            const baseURL = user.profilephoto.split('/')[3];
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
                <div className="user-page-outer-container">
                    <div className="search-bar-container-non-splash"><SearchBar></SearchBar></div>
                    <div className="user-page-profile-container">
                        <div className="user-page-left-side-container">
                            <div className="user-page-profile-container-photo-container">
                                <img className="user-page-profile-container-photo" alt="User Profile Img" src={`${url}`}></img>
                            </div>
                            <div className="user-page-user-actions">
                                {loggedUser && loggedUser.id !== user.id && 
                                    <button className="form-field-button-message-user" onClick={setActiveConvo}>Message User</button>
                                }
                            </div>
                        </div>
                        <div className="user-page-profile-container-information">
                            <div className="user-page-profile-container-information-username">
                                {user.username} {loggedUser && parseInt(loggedUser.id) === parseInt(id) && <EditUserFormModal></EditUserFormModal>}
                                {console.log(loggedUser)}
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
                        {user.Songs.length && <div className="now-playing">Now Playing:<div>{song ? song.title : null}</div></div>}
                        { user.Songs.length && 
                            <AudioPlayer 
                                onClickNext={song ? handleNext : null} 
                                onClickPrevious = {song ? handlePrev : null}
                                showSkipControls={true}
                                src={song ? song.url : null} 
                                className="audio-player"
                            />
                        }
                        <div className="song-container-song-list">
                        {user.Songs.length && user.Songs.map((song) => {
                                return (<div className="song-container-song-title" onClick={(() => updateSong(song))}>{song.title} {loggedUser && parseInt(loggedUser.id) === parseInt(id) && <span onClick={((e) => deleteSong(e, song.id))}><i class="fas fa-times-circle"></i></span>}</div>)
                            }
                        )}
                        </div>
                    </div>
                    {loggedUser && parseInt(loggedUser.id) === parseInt(id) && <AddSongForm></AddSongForm>}
                </div>
            )
        } else {
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
                <div className="user-page-outer-container">
                    <div className="search-bar-container-non-splash"><SearchBar></SearchBar></div>
                    <div className="user-page-profile-container">
                        <div className="user-page-left-side-container">
                            <div className="user-page-profile-container-photo-container">
                                <img className="user-page-profile-container-photo" alt="User Profile Img" src={`${url}`}></img>
                            </div>
                            <div className="user-page-user-actions">
                                {loggedUser && loggedUser.id !== user.id && 
                                    <button className="form-field-button-message-user" onClick={setActiveConvo}>Message User</button>
                                }
                            </div>
                        </div>
                        <div className="user-page-profile-container-information">
                            <div className="user-page-profile-container-information-username">
                                <div>{user.username}</div> {loggedUser && parseInt(loggedUser.id) === parseInt(id) && <div><EditUserFormModal></EditUserFormModal></div>}
                                {console.log(loggedUser)}
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
                        
                        <div>{user.username} doesn't have any songs yet! Maybe you should record some together?</div>
                    </div>
                        <div className="no-songs-spacer"> </div>
                        {loggedUser && parseInt(loggedUser.id) === parseInt(id) && <AddSongForm></AddSongForm>}

                </div>
            )
        }
    } else {
        return null;
    }

}

export default UserPage;