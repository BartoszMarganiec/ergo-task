import React from 'react';
import ReactDOM from 'react-dom';
import EventBus from './EventBus';
import QuestionRepository from '../repository/QuestionRepository';
import FullQuestionView from '../view/FullQuestionView.jsx';
import ErrorView from '../view/ErrorView.jsx';

export default class Question
{
  constructor(id, title, author, createDate, link, isAnswered, answerCount, hasAcceptedAnswer)
  {
    this.id = id;
    this.title = title;
    this.author = author;
    this.createDate = createDate;
    this.link = link;
    this.isAnswered = isAnswered;
    this.answerCount = answerCount;
    this.hasAcceptedAnswer = hasAcceptedAnswer;

    this.answers = false;
    this.acceptedAnswer = false;
  }

  getDetails()
  {
    const promise = QuestionRepository.getDetails(this.id);

    promise.then(data => {
      this.body = data.body;
      this.answers = data.answers;
      this.render();
    }).catch(error => {
      console.error(error);
      this.renderErrorView('Error fetching details');
    });
  }

  renderErrorView(error)
  {
    ReactDOM.render(<ErrorView error={error}/>, document.getElementById('main'));
  }

  render()
  {
    ReactDOM.render(<FullQuestionView item={this} answers={this.answers}/>, document.getElementById('main'));
  }
}
