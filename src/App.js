import React, { Component } from 'react';
import './App.css';
import MainContainer from './components/MainContainer'

import compy from './images/computersprite.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer />
      </div>
    );
  }
}

export default App;
