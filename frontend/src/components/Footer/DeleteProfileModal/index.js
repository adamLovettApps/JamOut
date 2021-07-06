import React, { useState } from 'react';
import { Modal } from "../../../context/Modal"
import DeleteProfileForm from './DeleteProfileForm';

function DeleteProfileModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="delete-profile-button" onClick={() => {setShowModal(true); console.log("hit")}}>Delete Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteProfileForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteProfileModal;