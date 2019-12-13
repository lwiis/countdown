import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Countdown from './Countdown/Countdown';
import CodeInput from './CodeInput/CodeInput';
import FlexView from 'react-flexview';
import Logo from './Logo/Logo';
import Gauge from './Gauge/Gauge';

class App extends Component {
  constructor() {
    super();
    this.state = {
      codeInputIsHidden: true,
      logoIsHidden: false,
      gaugeIsHidden: true,
      route: 'firstcountdown',
      temperature1: 28,
      temperature2: 24,
    }
    this.toggleCodeInputHidden = this.toggleCodeInputHidden.bind(this)
  }

  toggleCodeInputHidden() {
    this.setState({
      codeInputIsHidden: !this.state.codeInputIsHidden
    })
  }

  componentDidMount() {
    //console.log('component did mount');
  }

  render() {
    return (
      <FlexView vAlignContent='center' column marginTop='100px'>
        <FlexView hAlignContent='center'>
          <FlexView hAlignContent='left' basis={400} height={400} marginLeft='50px'>
            {!this.state.logoIsHidden && <Logo />}
            {!this.state.gaugeIsHidden && <Gauge temperature={this.state.temperature1}/>}
          </FlexView>
          <FlexView column hAlignContent='center'>
            <FlexView vAlignContent='center'>
              <Countdown date={new Date('2020-01-01T00:00:00')}
              // codeInputIsHidden={this.state.codeInputIsHidden} toggleCodeInput={this.toggleCodeInputHidden} 
              />
            </FlexView>
          </FlexView>
          <FlexView hAlignContent='right' basis={400} height={400} marginRight='50px'>
            {!this.state.logoIsHidden && <Logo />}
            {!this.state.gaugeIsHidden && <Gauge temperature={this.state.temperature2}/>}
          </FlexView>
        </FlexView>
        <FlexView vAlignContent='bottom' hAlignContent='center'>
          {!this.state.codeInputIsHidden && <CodeInput />}
        </FlexView>
      </FlexView>
    );
  }
}

export default App;
