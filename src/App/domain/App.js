import React from 'react';
import ReactDOM from 'react-dom';
import AppView from '../view/AppView.jsx';
import LoginView from '../view/LoginView.jsx';
import SearcherView from '../view/SearcherView.jsx';
import EventBus from './EventBus';
import Searcher from './Searcher';
import ItemList from './ItemList';
import cookieParse from '../helpers/CookieParser';
import config from '../config/config';

export default class App
{
  constructor()
  {
    this.inited = false;

    EventBus.subscribe('searcher.done', () => this.renderHeader());
  }

  init()
  {
    if(this.inited) {
      throw 'Already inited.';
    }

    this.initOAuthEvents();
    this.items = new ItemList;
    this.searcher = new Searcher;

    this.inited = true;
  }

  render()
  {
    if(this.inited === false) {
      throw 'Must init app';
    }

    ReactDOM.render(<AppView/>, document.getElementById('root'));
    this.renderHeader();
    this.renderMain();
  }

  renderHeader()
  {
    const logged = this.isLogged();

    if(this.searcher.hasSearched() === false) {
      ReactDOM.render(<LoginView logged={logged}/>, document.getElementById('header'));
    } else {

      ReactDOM.render(
        <React.Fragment>
          <LoginView logged={logged}/>
          <SearcherView searched={this.searcher.getSearched()}/>
        </React.Fragment>,
        document.getElementById('header')
      );
    }
  }

  renderMain()
  {
    if(this.searcher.hasSearched() === false) {
      ReactDOM.render(<SearcherView/>, document.getElementById('main'));
    } else {
      this.items.renderList();
    }
  }

  initOAuthEvents()
  {
    EventBus.subscribe('app.login', () => {
      const url = config.oauth.url
        + '?client_id=' + config.oauth.clientId
        + '&scope=no_expiry&redirect_uri=' + config.oauth.redirectUri;

      window.location = url;
    });

    EventBus.subscribe('app.logout', () => {
      window.location = '/logout';
    });
  }

  isLogged()
  {
    if(!document.cookie) {
      return false;
    }

    let data = cookieParse(document.cookie);

    if(data.logged === "1") {
      return true;
    }

    return false;
  }
}
