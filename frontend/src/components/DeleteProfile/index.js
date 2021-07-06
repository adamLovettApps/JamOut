import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import "./DeleteProfile.css"
import { deleteUser } from '../../store/users';
import * as sessionActions from '../../store/session';

const DeleteProfile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const handleDelete = () => {
        dispatch(deleteUser(user.id));
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <div className="delete-profile-container">
            <div className="delete-profile-header">Delete Profile?</div>
            <div>This cannot be undone.</div>
            <div className="delete-profile-buttons">
                <button className="form-field-button cancel-delete-button" onClick={(() => history.push("/"))}>Cancel</button> 
                <button className="form-field-button confirm-delete-button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );

}

export default DeleteProfile;