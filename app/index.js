console.log('index.js line 1')
import React, { Component } from 'react';
import { Root } from './config/routes';

console.log('index.js line 3')

class App extends Component {
  render() {
    return (
      <Root />
    );
  }
}

export default App;
