import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Countdown from './Countdown/Countdown';
import CodeInput from './CodeInput/CodeInput';

class App extends Component {

  componentDidMount() {
    //console.log('component did mount');
  }

  render() {
    return (
      <div className="App">
        <Countdown date={new Date('2020-01-01T00:00:00')}/>
        <CodeInput />
      </div>
    );
  }
}

export default App;
