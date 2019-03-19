import React from 'react';
import ReactDOM from 'react-dom';
import EventBus from './EventBus';
import ItemView from '../view/ItemView.jsx';
import ResultsView from '../view/ResultsView.jsx';
import ErrorView from '../view/ErrorView.jsx';
import Question from './Question';
import QuestionRepository from '../repository/QuestionRepository';

export default class ItemList
{
  constructor(questions)
  {
    this.questions = [];
    this.itemDetails = [];

    EventBus.subscribe('question.select', data => this.select(data.id));
    EventBus.subscribe('questions.render', data => this.renderList());
    EventBus.subscribe('searcher.done', data => {
      this.load(data);
      this.renderList();
    });
    EventBus.subscribe('searcher.error', error => this.renderError(error));

}

  load(questions)
  {
    if(Array.isArray(questions) === false) {
      throw new Error('This is not array');
    }

    if(questions.some(question => question instanceof Question === false)) {
      throw new Error('Array should contains only Question objects');
    }

    this.questions = questions;
  }

  select(id)
  {
    const question = this.questions.find(item => item.id === id);

    question.getDetails();
    question.render();
  }

  getItemDetails(id)
  {
    const promise = QuestionRepository.getDetails(id);

    promise.then(data => {
      this.renderItemDetails(data);
    }).catch(error => {
      console.error(error);
      this.renderError('Error fetching details');
    });
  }

  isEmpty()
  {
    return this.questions.length === 0;
  }

  renderError(error)
  {
    ReactDOM.render(<ErrorView error={error}/>, document.getElementById('main'));
  }

  renderList()
  {
    ReactDOM.render(<ResultsView questions={this.questions}/>, document.getElementById('main'));
  }
}
