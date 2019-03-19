import React from 'react';
import DOMPurify from 'dompurify';
import AnswerView from './AnswerView.jsx';
export default class AnswersView extends React.Component
{
  renderAnswers()
  {
    if (this.props.answers.hasAcceptedAnswer) {
      return <AnswerView answer={this.props.acceptedAnswer}/>
    } else if(this.props.answers.length === 0) {
      return <div className="no-answers">No answers</div>
    } else {
      const answers = this.props.answers.map(answer => <AnswerView answer={answer}/>);
      return answers;
    }
  }

  render()
  {
    return <div className="answers">
      <p className="header">Answers</p>
      {this.renderAnswers()}
    </div>;
  }
}
