import { Routes, Link, Route } from 'react-router-dom';
import Logo from '../images/Logo.png';
const Header = ({ mail, onClick }) => {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="Логотип" />
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="header__auth">
                <p className="header__text">{mail}</p>
                <Link to="/sign-in" className="header__link" type="button" onClick={onClick}>
                  Выйти
                </Link>
              </div>
            }></Route>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }></Route>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }></Route>
        </Routes>
      </div>
    </header>
  );
};

export default Header;
