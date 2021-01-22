import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../utils/firebase-config'
import { AuthContext } from '../contexts/Auth';

export default function Navigation() {

    const [togggled, setTogggled] = useState(true)

    const { currentUser } = useContext(AuthContext);
    const toggleMenu = () => {
        setTogggled(!togggled)
    }
    return (
    <Fragment>
        {currentUser ?
        <Fragment>
            <button className="menu-toggle menu-toggle--open" id="menu-toggle" onClick={toggleMenu}><svg height="25px" viewBox="0 -53 384 384" width="30px" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/></svg></button>
            <nav className={!togggled ? "nav open" : "nav closed"} aria-label="Principale">
            <button className="menu-toggle menu-toggle--close" id="menu-toggle" onClick={toggleMenu}><svg height="25px" viewBox="0 0 329.26933 329" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg></button>
                <h2 className="nav__heading sr-only">Navigation principale</h2>
                <ul className="nav__list">
                    <li className="nav__item" onClick={toggleMenu}>
                        <Link className="nav__link" to="/">Accueil</Link>
                    </li>
                    <li className="nav__item" onClick={toggleMenu}>
                        <Link className="nav__link" to="/captures">Captures</Link>
                    </li>
                    <li className="nav__item" onClick={toggleMenu}>
                        <Link className="nav__link" to="/reprises">Reprises</Link>
                    </li>
                    <li className="nav__item" onClick={toggleMenu}>
                        <Link className="nav__link" to="/encyclopedy">Encyclopédie</Link>
                    </li>
                    <li className="nav__item" onClick={toggleMenu}>
                        <Link className="nav__link" to="/users">Liste d'utilisateurs</Link>
                    </li>
                    <li className="nav__item" onClick={toggleMenu}>
                        <Link className="nav__link" to="/places">Sites de baguage</Link>
                    </li>
                    <li className="nav__item" onClick={toggleMenu}>
                        <button onClick={() => firebase.auth().signOut()} className="sign-out">Se déconnecter</button>
                    </li>
                </ul>
            </nav>
        </Fragment> : ''
            }
            </Fragment>
    )
}
