import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditUserForm from './EditUserForm';

function EditUserFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-profile-popup-button" onClick={() => setShowModal(true)}>Edit Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUserForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditUserFormModal;