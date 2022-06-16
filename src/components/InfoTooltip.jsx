function InfoTooltip({ isOpen, image, title, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : null}`}>
      <div className="popup__container popup__info">
        <img className="popup__status" src={image} alt={title} />
        <h2 className="popup__message">{title}</h2>
        <button className="popup__btn-close" type="button" title="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
