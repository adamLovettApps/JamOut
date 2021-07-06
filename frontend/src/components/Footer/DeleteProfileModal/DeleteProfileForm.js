import React from 'react';

const DeleteProfileForm = ({setShowModal}) => {

    return (
        <div className="delete-profile-container">
            <div className="delete-profile-header">Delete Profile?</div>
            <div>
                <button className="form-field-button">Cancel</button> 
                <button className="form-field-button" >Delete</button>
            </div>
        </div>
    );

}

export default DeleteProfileForm;