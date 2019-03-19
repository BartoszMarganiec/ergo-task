import React from 'react';
import EventBus from '../domain/EventBus';
import ItemView from './ItemView.jsx';

export default class ResultsView extends React.Component
{
  renderList(questions)
  {
    if(questions.length === 0) {
      return <div className="results empty">No results</div>;
    }

    return questions.map(item => <ItemView item={item}/>);
  }

  render()
  {
    return <div className="results">
      {this.renderList(this.props.questions)}
    </div>
  }
}
