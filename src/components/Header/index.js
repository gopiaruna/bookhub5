import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon, FaBars} from 'react-icons/fa'
import {BsSun} from 'react-icons/bs'

import './index.css'
import HeaderContext from '../../HeaderContext/HeaderContext'

class Header extends Component {
  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {
            activeLink,
            onClickBookShelves,
            onClickHome,
            theme,
            onClickThemeChanger,
            oncClickFavouriteLink,
            onClickNavIcon,
          } = value

          const onClickNavButton = () => {
            onClickNavIcon()
          }

          const onClickLogout = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          const onClickHomeLink = () => {
            onClickHome()
          }

          const onClickShelf = () => {
            onClickBookShelves()
          }

          const themeChanger = () => {
            onClickThemeChanger()
          }
          const onClickFavourite = () => {
            oncClickFavouriteLink()
          }

          const headerCont = theme ? 'dark' : ''
          const iconColor = theme ? 'white' : 'black'
          return (
            <div className={`nav-cont ${headerCont}`}>
              <Link to="/">
                {theme ? (
                  <h1 className="navbar-logo-dark">Book Hub</h1>
                ) : (
                  <img
                    src="https://res.cloudinary.com/gopiganesula/image/upload/v1652253563/Group_7731_xjdbqj_2_lxuzge.jpg"
                    alt="website logo"
                    className="navbar-logo"
                  />
                )}
              </Link>
              <div className="nav-icon">
                <button
                  type="button"
                  className="nav-btn"
                  onClick={onClickNavButton}
                >
                  <FaBars color={iconColor} />
                </button>
              </div>

              <ul className="nav-links-cont">
                <li className="nav-links">
                  <button
                    type="button"
                    onClick={themeChanger}
                    className="theme-btn"
                  >
                    {theme ? (
                      <BsSun color="#ffffff" size={20} />
                    ) : (
                      <FaMoon size={20} />
                    )}
                  </button>
                </li>

                <li className="nav-links">
                  <Link
                    to="/"
                    className={
                      activeLink === 'home' ? 'nav-links active' : 'nav-links'
                    }
                    onClick={onClickHomeLink}
                  >
                    <p>Home</p>
                  </Link>
                </li>
                <li className="nav-links">
                  <Link
                    to="/shelf"
                    className={
                      activeLink === 'bookShelf'
                        ? 'nav-links active'
                        : 'nav-links'
                    }
                    onClick={onClickShelf}
                  >
                    <p>Bookshelves</p>
                  </Link>
                </li>
                <li className="nav-links">
                  <Link
                    to="/fav"
                    className={
                      activeLink === 'favourite'
                        ? 'nav-links active'
                        : 'nav-links'
                    }
                    onClick={onClickFavourite}
                  >
                    <p>Favourite</p>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="logout-btn"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default withRouter(Header)
