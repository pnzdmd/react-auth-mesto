import React, { useEffect } from 'react';

const Popup = ({ isOpen, onClose, popupType, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    // удаление обработчика
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [isOpen, onClose]);

  // закрытие по оверлею
  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClose}
      className={`popup popup_${popupType} ${isOpen ? 'popup_opened' : null}`}>
      <div className="popup__container">
        {children}
        <button className="popup__btn-close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default Popup;
