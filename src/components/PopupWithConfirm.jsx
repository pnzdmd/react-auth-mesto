import React from 'react';
import PopupWithForm from './PopupWithForm';

const PopupWithConfirm = ({ isOpen, onClose, onSubmit, card }) => {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      popupType={`confirmation`}
      title="Вы уверены?"
      popupNameForm={`confirm`}
      name={`confirm`}
      submitButtonText="Да"></PopupWithForm>
  );
};

export default PopupWithConfirm;
