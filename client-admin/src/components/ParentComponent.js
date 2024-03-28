import React, { Component } from 'react';
import Home from './Home';
import Category from './Category';

class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastIndex: 0,
    };
  }

  updateLastIndex = (index) => {
    this.setState({ lastIndex: index });
  };

  render() {
    return (
      <div>
        <Home lastIndex={this.state.lastIndex} />
      <Category updateLastIndex={this.updateLastIndex} />
      </div>
    );
  }
}

export default ParentComponent;
