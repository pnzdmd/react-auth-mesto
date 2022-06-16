import React from 'react';
import Popup from './Popup';

const PopupWithForm = ({
  onSubmit,
  popupType,
  isOpen,
  title,
  popupNameForm,
  name,
  children,
  submitButtonText,
  onClose,
}) => {
  return (
    <Popup isOpen={isOpen} popupType={popupType} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form onSubmit={onSubmit} className={`popup__form popup__form_${popupNameForm}`} name={name}>
        {children}
        <button className="popup__btn-save" type="submit" data-value={submitButtonText}>
          {submitButtonText}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
