import React, { Fragment } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Fragment>
      <header className="header">
        <h1 className="main-heading"><a href="/" className="main-heading__link" title="Page d'accueil de Birdy">Birdy</a></h1>
        <Router>
          <nav className="nav" aria-label="Principale">
            <h2 className="nav sr-only">Navigation principale</h2>
            <ul className="nav__list">
              <li className="nav__item">
                <Link className="nav__link" to="/">Accueil</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>


      </header>
    </Fragment>
  );
}

export default App;
