import React from 'react';
import EventBus from '../domain/EventBus';

export default class SearcherView extends React.Component
{
  constructor()
  {
    super();
    this.state = {searched: ''};
  }

  componentWillMount()
  {
    this.setState({searched: this.props.searched});
  }

  handleChange(e)
  {
    this.setState({searched: e.target.value});
  }

  handleSubmit(e)
  {
    const toSearch = e.target.searcher.value;
    e.preventDefault();

    EventBus.publish('searcher.click', {toSearch: toSearch});
  }

  render()
  {
    return <div className="searcher">
      <form onSubmit={this.handleSubmit}>
        <label for="searcher">Szukaj:<input name="searcher" id="searcher" type="text" value={this.state.searched} onChange={this.handleChange.bind(this)}/></label>
        <button type="submit">Wyszukaj</button>
      </form>
    </div>;
  }

}
