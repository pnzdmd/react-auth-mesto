import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import remove_img from '../images/remove_img.png';

const Card = ({ card, onCardClick, onCardLike, onCardDeleteClick }) => {
  const { link, name, likes, owner } = card;

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked ? 'element__like-btn_active' : 'element__like-btn'
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  return (
    <figure className="element">
      <img src={link} alt={name} className="element__img" onClick={handleClick} />
      {isOwn && (
        <img
          onClick={handleDeleteClick}
          src={remove_img}
          alt="Удаление изображения"
          className="element__img_remove"
        />
      )}

      <figcaption className="element__group">
        <h2 className="element__title">{name}</h2>
        <div className="element__like">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"></button>
          <p className="element__like-count">{likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
};

export default Card;
