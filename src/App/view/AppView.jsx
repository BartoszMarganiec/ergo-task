import React from 'react';
import SearcherView from './SearcherView.jsx';
import './style.scss';

export default class AppView extends React.Component
{


  render()
  {
    return <div className="app">
            <div id="header" className="header"></div>
            <div id="main"></div>
            <div id="footer"></div>
          </div>;
  }
}
