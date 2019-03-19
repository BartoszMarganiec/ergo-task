import React from 'react';
import ReactDOM from 'react-dom';
import EventBus from './EventBus';
import SearcherRepository from '../repository/SearcherRepository';
import ResultsView from '../view/ResultsView.jsx';

export default class Searcher
{
  constructor()
  {
    this.searched = '';

    EventBus.subscribe('searcher.click', data => this.search(data));
  }

  search(data)
  {
    const searchPromise = SearcherRepository.search(data.toSearch);
    this.searched = data.toSearch;

    searchPromise
      .then(data => EventBus.publish('searcher.done', data))
      .catch(error => {
        console.error(error);
        EventBus.publish('searcher.error', error.message);
      });
  }

  getSearched()
  {
    return this.searched;
  }

  hasSearched()
  {
    return this.searched !== '';
  }

  render()
  {
    ReactDOM.render(<SearcherView searched={this.searched}/>, document.getElementById('header'));
  }
}
