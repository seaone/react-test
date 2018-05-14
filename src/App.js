import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import NewsContainer from './containers/NewsContainer';
import ProfileContainer from './containers/ProfileContainer';
import LoginContainer from './containers/LoginContainer';
import PrivateRoute from './containers/PrivateRoute';
import LoginButton from './components/LoginButton';
import NotFound from './components/NotFound';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <nav>
          <NavLink exact className="nav-link" activeClassName="active" to="/">Главная</NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/news">Новости</NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/profile">Профиль</NavLink>
          <LoginButton />
        </nav>
      </header>

      <main className="appMain">
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/news" component={NewsContainer} />
          <Route path="/login" component={LoginContainer} />
          <PrivateRoute path="/profile" component={ProfileContainer} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}
