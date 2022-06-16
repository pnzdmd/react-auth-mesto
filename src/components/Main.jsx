import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

const Main = ({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDeleteClick,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const { avatar, name, about } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={avatar} alt={name} className="profile__avatar" />
          <button
            className="profile__avatar-edit"
            type="button"
            title="Обновить аватар"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button className="profile__btn-edit" type="button" onClick={onEditProfile}></button>
          <p className="profile__about">{about}</p>
        </div>
        <button className="profile__btn-add" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
