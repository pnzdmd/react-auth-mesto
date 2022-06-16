import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddNewPlace }) => {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  function handlePlaceNameAdd(evt) {
    setPlaceName(evt.target.value);
  }

  function handlePlaceLinkAdd(evt) {
    setPlaceLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddNewPlace({
      name: placeName,
      link: placeLink,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setPlaceName('');
      setPlaceLink('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      popupType={`card`}
      title="Новое место"
      popupNameForm={`card`}
      name={`card`}
      submitButtonText="Создать">
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            onChange={handlePlaceNameAdd}
            value={placeName}
            type="text"
            className="popup__input popup__input_type_name"
            id="img"
            name="name-img"
            placeholder="Название"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="error" id="img-error"></span>
        </label>
        <label className="popup__label">
          <input
            onChange={handlePlaceLinkAdd}
            value={placeLink}
            type="text"
            className="popup__input popup__input_type_about"
            id="link"
            name="link-img"
            placeholder="Ссылка на картинку"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="error" id="link-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
