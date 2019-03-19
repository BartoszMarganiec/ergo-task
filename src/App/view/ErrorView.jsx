import React from 'react';

export default class ErrorView extends React.Component
{
  render()
  {
    return <div className="error">{this.props.error}</div>;
  }
}
