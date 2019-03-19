import React from 'react';
import EventBus from '../domain/EventBus';
import DOMPurify from 'dompurify';
import AnswersView from './Answers/AnswersView.jsx';

export default class FullQuestionView extends React.Component
{
  back()
  {
    EventBus.publish('questions.render');
  }

  renderBody()
  {
    if(typeof this.props.item.body !== 'undefined') {
      return <div className="body" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.item.body)}}></div>
    } else {
      return <div className="loader-lds"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
    }
  }

  renderAnswers()
  {
    if(this.props.answers === false) {
      return;
    }
    
    return <AnswersView answers={this.props.answers}/>;
  }

  render()
  {
    const date = new Date(this.props.item.createDate * 1000).toLocaleString();

    return <div className="full-item">
      <div className="header">{this.props.item.author} [{date}]</div>
      <div className="back"><a onClick={this.back}>Back to list</a></div>
      <div className="title" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.item.title)}}></div>
      <div className="link"><a href={this.props.item.link}>[link]</a></div>
      {this.renderBody()}
      <div className="back"><a onClick={this.back}>Back to list</a></div>
      {this.renderAnswers()}
    </div>
  }
}
