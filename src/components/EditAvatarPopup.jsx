import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      popupType={`avatar`}
      title="Обновить аватар"
      popupNameForm={`avatar`}
      name={`avatar`}
      submitButtonText="Сохранить">
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            ref={avatarRef}
            type="url"
            className="popup__input popup__input_type_descr"
            id="avatar"
            name="link-avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="error" id="avatar-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
