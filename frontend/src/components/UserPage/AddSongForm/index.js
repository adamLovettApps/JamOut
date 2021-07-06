import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../../store/users";
import { addASong } from "../../../store/users";
import "./AddSongForm.css"


const AddSongForm = () => {
    const user = useSelector((state) => state.users.currentUser);
    const [songLoading, setSongLoading] = useState(false);
    const [song, setSong] = useState(null);
    const [title, setTitle] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();

    const addSong = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("song", song); 
        formData.append("id", id);
        formData.append("title", title);

        setSongLoading(true);
        dispatch(addASong(formData))
        
            // let song = await res.json();
        dispatch(getUser(id));
        setSongLoading(false);
        document.querySelector('.choose-song-text-inner').innerText = "Choose a Song"
        document.getElementById('song-upload-selector-div').classList.remove("song-upload-selected");
        document.getElementById('song-upload-selector-div').classList.add("song-upload-selector");
        setTitle("");
        
    }

    const updateSong = (e) => {
        const file = e.target.files[0];
        document.querySelector('.choose-song-text-inner').innerText = "Song Chosen"
        document.getElementById('song-upload-selector-div').classList.remove("song-upload-selector");
        document.getElementById('song-upload-selector-div').classList.add("song-upload-selected");
        setSong(file);
    }

    return (
        <>
            <div className='add-song-form-management'>
                <div className="add-song-header">Add a Song</div>
                <div className="add-song-divider-container"><hr className="add-song-divider"></hr></div>
                <form onSubmit={addSong} >
                    <div className="flex-form">
                        <div className="song-title-text-div"> <input className="form-field-input-song" type="text" placeholder="Song Title" value={title} onChange={((e) => setTitle(e.target.value))}></input></div>
                        <div id="song-upload-selector-div" className="song-upload-selector">
                            <label for="song-input" id="file-label"><div className="choose-song-text"><div className="choose-song-text-inner">Choose a Song</div></div></label>
                            <input 
                                type="file" 
                                id="song-input"
                                accept="mp3"
                                onChange={updateSong}
                            ></input>
                        </div>
                        <div className="form-field-button-song-upload-container"><button type="submit" className="form-field-button-song-upload">Upload Song</button></div>
                    
                    </div>
                </form>
                <div>{(songLoading)&& <p>Loading...</p>}</div>
            </div>
        </>
    )
}

export default AddSongForm;