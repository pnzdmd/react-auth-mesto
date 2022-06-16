import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ onUpdateUser, isOpen, onClose }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      description,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      popupType={`profile`}
      title="Редактировать профиль"
      popupNameForm={`profile`}
      name={`profile`}
      submitButtonText="Сохранить">
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            value={name || ''}
            onChange={handleChangeName}
            type="text"
            className="popup__input popup__input_type_name"
            id="firstname"
            name="firstname"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="error" id="firstname-error"></span>
        </label>
        <label className="popup__label">
          <input
            value={description || ''}
            onChange={handleChangeDescription}
            type="text"
            className="popup__input popup__input_type_about"
            id="description"
            name="description"
            placeholder="Профессия"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="error" id="description-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
