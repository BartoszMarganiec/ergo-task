import React from 'react';
import DOMPurify from 'dompurify';

export default class AnswerView extends React.Component
{
  renderAccepted()
  {
    if(this.props.answer.isAccepted) {
      return <span className="accepted-answer">Accepted answer</span>;
    }
  }

  render()
  {
    const date = new Date(this.props.answer.createDate * 1000).toLocaleString();

    return <div className="answer">
      <div className="header">{this.props.answer.author} [{date}] {this.renderAccepted()}</div>
      <div className="body" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.answer.body)}}></div>
    </div>
  }
}
