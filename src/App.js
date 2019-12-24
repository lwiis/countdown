import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Countdown from './Countdown/Countdown';
import CodeInput from './CodeInput/CodeInput';
import FlexView from 'react-flexview';
import Logo from './Logo/Logo';
import Gauge from './Gauge/Gauge';
import Hack from './Hack/Hack';
import Beacon from './Beacon/Beacon';
import Fireworks from 'fireworks-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isRunning: localStorage.getItem('isRunning')?localStorage.getItem('isRunning'):true,
      route: localStorage.getItem('route')?localStorage.getItem('route'):'main',
      temperature1: 28,
      temperature2: 24,
    }

    this.handleButtonPressed = this.handleButtonPressed.bind(this);
    this.handleTemperature1 = this.handleTemperature1.bind(this);
    this.handleTemperature2 = this.handleTemperature2.bind(this);
    this.checkTemperature = this.checkTemperature.bind(this);
    this.checkCode = this.checkCode.bind(this);
    this.click = this.click.bind(this);
  }

  click() {
    switch (this.state.route) {
      case 'main':
        this.setState({
          route: 'hack'
        });
        break;
      case 'hack':
        this.setState({
          route: 'countdown'
        })
        break;
      case 'countdown':
        this.setState({
          route: 'temperature'
        });
        break;
      case 'temperature':
        this.setState({
          route: 'code'
        })
        break;
      default:
        this.setState({
          route: 'main'
        });
        break;
    }
  }

  checkCode(code) {
    console.log('checking code ' + code);
    if (code.toLowerCase() === '12345') {
      this.setState({
        route: 'win',
        isRunning: false
      })
    }
  }

  handleTemperature1(temp) {
    this.setState({
      temperature1: temp,
    })
  }

  handleTemperature2(temp) {
    this.setState({
      temperature2: temp,
    })
  }

  handleButtonPressed() {
    if(this.state.route==='countdown') {
      this.setState({route: 'temperature'});
    }
  }

  checkTemperature() {
    if (this.state.route === 'temperature' && (this.state.temperature1 >= 30 && this.state.temperature2 >= 30)) {
      console.log('done!');
      setTimeout(()=>{
        this.setState({
          route: 'code'
        });
      }, 2000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.route === 'temperature') {
      this.checkTemperature();
    }

    this.setStorage();
  }

  componentDidMount() {
    this.setStorage();
  }

  setStorage() {
    localStorage.setItem('isRunning', this.state.isRunning);
    localStorage.setItem('route', this.state.route);
  }

  render() {
    return (
      <FlexView vAlignContent='center' hAlignContent='center'>
        <FlexView><Beacon onTemperature1Change={this.handleTemperature1} onTemperature2Change={this.handleTemperature2} onButtonPressed={this.handleButtonPressed}/></FlexView>
        <FlexView vAlignContent='center' hAlignContent='center' onClick={this.click}>
          {this.state.route === 'main' && <FlexView hAlignContent='center' basis='2000px' width='2000px' marginTop='-280px'><Logo /></FlexView>}
          {this.state.route === 'hack' && <Hack />}
          {this.state.route === 'countdown' && <FlexView><Countdown isRunning={this.state.isRunning} date={new Date('2020-01-01T00:00:00')} fontsize='18em' /></FlexView>}
          {this.state.route === 'temperature' && <FlexView column basis='100vw'>
            <FlexView hAlignContent='center' basis='100vh'>
              <FlexView hAlignContent='left' marginRight='200px' basis='600px'><Gauge temperature={this.state.temperature1} max={30} min={20} />}</FlexView>
              <FlexView hAlignContent='center' vAlignContent='center'><Countdown isRunning={this.state.isRunning} date={new Date('2020-01-01T00:00:00')} fontsize='13em' /></FlexView>
              <FlexView hAlignContent='right' marginLeft='200px' basis='600px'><Gauge temperature={this.state.temperature2} max={30} min={20} />}</FlexView>
            </FlexView>}
         </FlexView>
          }
          {this.state.route === 'code' && <FlexView column basis='100vw'>
            <FlexView vAlignContent='top' basis='34vh' />
            <FlexView hAlignContent='center' vAlignContent='center' basis='32vh'><Countdown isRunning={this.state.isRunning} date={new Date('2020-01-01T00:00:00')} fontsize='13em' /></FlexView>
            <FlexView vAlignContent='center' hAlignContent='center' basis='17vh'>
              <CodeInput checkCode={this.checkCode} />
            </FlexView>
            <FlexView vAlignContent='bottom' basis='16vh' />
          </FlexView>}
          {this.state.route === 'win' && <FlexView><Fireworks width={3440} height={1440}/></FlexView>}
        </FlexView>
      </FlexView>
    );
  }
}

export default App;
