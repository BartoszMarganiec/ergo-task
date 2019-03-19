import React from 'react';
import EventBus from '../domain/EventBus';

export default class LoginView extends React.Component
{
  logout()
  {
    EventBus.publish('app.logout');
  }

  login()
  {
    EventBus.publish('app.login');
  }

  renderLogoutButton()
  {
    return <button className="log-button log-out" onClick={this.logout}>Log Out</button>;
  }

  renderLoginButton()
  {
    return <React.Fragment>
      <button className="log-button log-in" onClick={this.login}><p>Login with StackOverflow</p>
      <p className="log-in-info">Log in to increase limits</p>
      </button>
    </React.Fragment>;
  }

  render()
  {

    if(this.props.logged === false) {
      return this.renderLoginButton();
    } else {
      return this.renderLogoutButton();
    }
  }
}
