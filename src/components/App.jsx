import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirm from './PopupWithConfirm';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Popup from './Popup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/api';
import * as auth from '../utils/auth';

import success from '../images/success.svg';
import fail from '../images/fail.svg';

const defaultSelectedCard = { name: '', link: '' };

const App = () => {
  const navigate = useNavigate();
  // изменение профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // добавление карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // изменение аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // открытиие изображения
  const [selectedCard, setSelectedCard] = useState(defaultSelectedCard);
  // данные профиля
  const [currentUser, setCurrentUser] = useState({});
  // данные по карточкам
  const [cards, setCards] = useState([]);
  // открытие/закрытие попапа аватара
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  // удаление карточки
  const [removedCardId, setRemovedCardId] = useState('');

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [popupImage, setPopupImage] = React.useState('');
  const [email, setEmail] = React.useState(null);
  const [popupTitle, setPopupTitle] = React.useState('');
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  // текст ошибки при авторизации/регистрации
  const errorText = 'Что-то пошло не так! Попробуйте ещё раз.';

  /* Регистрация */
  function register(email, password) {
    auth
      .registerUser(email, password)
      .then(() => {
        setPopupImage(success);
        setPopupTitle('Вы успешно зарегистрировались!');
        navigate('/sign-in');
      })
      .catch(() => {
        setPopupImage(fail);
        setPopupTitle(errorText);
      })
      .finally(handleInfoTooltip);
  }

  /* Вход */
  function logIn(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate('/');
      })
      .catch(() => {
        setPopupImage(fail);
        setPopupTitle(errorText);
        handleInfoTooltip();
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.data.email);
            navigate('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemovedCardId(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  /* Ставим и убираем лайк */
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    const action = !isLiked ? api.addLike(card._id) : api.removeLike(card._id);
    action
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* Удалить карточку */
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((items) => items.filter((i) => i._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* Обновление данных пользователя */
  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* Обновление аватара */
  function handleAvatarUpdate(data) {
    api
      .updateAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* Добавление карточки */
  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    setEmail(null);
    navigate('/sign-in');
    localStorage.removeItem('jwt'); //удаление токена
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(defaultSelectedCard);
    setInfoTooltip(false);
    setIsImagePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header mail={email} onClick={handleLogOut} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                isLogged={isLoggedIn}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDeleteClick}
                cards={cards}></ProtectedRoute>
            }></Route>
          <Route path="/sign-up" element={<Register register={register} />} />
          <Route path="/sign-in" element={<Login logIn={logIn} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddPlaceSubmit}
        />
        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={removedCardId}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          image={popupImage}
          title={popupTitle}
          isOpen={infoTooltip}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
