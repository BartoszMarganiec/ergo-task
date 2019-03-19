import React from 'react';
import EventBus from '../domain/EventBus';
import DOMPurify from 'dompurify';

export default class ItemView extends React.Component
{
  select()
  {
    EventBus.publish('question.select', {id: this.props.item.id});
  }

  render()
  {
    const date = new Date(this.props.item.createDate * 1000).toLocaleString();

    return <div className="item" onClick={this.select.bind(this)}>
      <div className="title" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.item.title)}}></div>
      <div className="date">{date.toLocaleString()}</div>
      <div className="count">Answers: {this.props.item.answerCount}</div>
      <div className="count">Accepted answer: {this.props.item.hasAcceptedAnswer ? 'YES' : 'NO'}</div>
    </div>
  }
}
