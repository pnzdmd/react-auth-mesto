const ImagePopup = ({ card, onClose }) => {
  const { link, name } = card;

  return (
    <div className={`popup popup_img ${link && 'popup_opened'}`}>
      <div className='popup__image-container'>
        <img src={link} alt={name} className='popup__image' />
        <p className='popup__image-title'>{name}</p>
        <button
          className='popup__btn-close popup__btn-close_img'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ImagePopup;
