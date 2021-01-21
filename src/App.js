import React, { Fragment, useEffect, useState } from 'react';
import './index';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from './contexts/Auth.jsx';
import firebase from './utils/firebase-config';

import "./index.scss"

import Home from "./pages/Home";
import Users from './pages/Users';
import User from './pages/User';
import Register from './pages/Register';
import Login from './pages/Login';
import Captures from './pages/Captures';
import Reprises from './pages/Reprises';
import Encyclopedy from './pages/Encyclopedy';
import EncyBird from './pages/EncyBird';
import NewCapture from './pages/NewCapture';
import SetPlace from './pages/SetPlace';
import NewCatchingPlace from './pages/NewCatchingPlace';
import Capture from './pages/Capture';
import NewReprise from './pages/NewReprise';
import Reprise from './pages/Reprise';
import Places from './pages/Places';

function App() {
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const toggleMenu = () => {

  }

  // console.log(window.location.pathname.type + ' ' + (path !== '/login' && path !== '/register'));

  return (
    <AuthProvider>

      <Router>
        <header className="header">
          <h1 className="main-heading"><a href="/" className="main-heading__link" title="Page d'accueil de Birdy">Birdy</a></h1>
          <button className="manu-toggle" id="menu-toggle" onClick={toggleMenu}>Ouvrir le menu</button>
          <nav className="nav" aria-label="Principale">
            <h2 className="nav sr-only">Navigation principale</h2>
            <ul className="nav__list">

              {(path !== '/login' && path !== '/register')
                ? <Fragment>
                  <li className="nav__item">
                    <Link className="nav__link" to="/">Accueil</Link>
                  </li>
                  <li className="nav__item">
                    <Link className="nav__link" to="/captures">Captures</Link>
                  </li>
                  <li className="nav__item">
                    <Link className="nav__link" to="/reprises">Reprises</Link>
                  </li>
                  <li className="nav__item">
                    <Link className="nav__link" to="/encyclopedy">Encyclopédie</Link>
                  </li>
                  <li className="nav__item">
                    <Link className="nav__link" to="/users">Liste d'utilisateurs</Link>
                  </li>
                  <li className="nav__item">
                    <Link className="nav__link" to="/places">Sites de baguage</Link>
                  </li>
                  <li className="nav__item">
                    <button onClick={() => firebase.auth().signOut()}>Sign out</button>
                  </li>
                </Fragment> : ''
              }

            </ul>
          </nav>
        </header>
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/:user" component={User} />
        <PrivateRoute exact path="/places" component={Places} />
        <PrivateRoute exact path="/captures" component={Captures} />
        <PrivateRoute exact path="/captures/:capture" component={Capture} />
        <PrivateRoute exact path="/new-capture/:ring" component={NewCapture} />
        <PrivateRoute exact path="/new-capture/:ring/place" component={SetPlace} />
        <PrivateRoute exact path="/reprises" component={Reprises} />
        <PrivateRoute exact path="/reprises/:reprise" component={Reprise} />
        <PrivateRoute exact path="/new-reprise/:doc" component={NewReprise} />
        <PrivateRoute exact path="/new-catching-place" component={NewCatchingPlace} />
        <PrivateRoute exact path="/encyclopedy" component={Encyclopedy} />
        <PrivateRoute exact path="/encyclopedy/:bird" component={EncyBird} />
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/" component={Home} />
      </Router>


    </AuthProvider>
  );
}

export default App;
