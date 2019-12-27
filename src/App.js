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
import CustomFireworks from './CustomFireworks/CustomFireworks';

const clientId = Date.now();
const targetTemperature = 30;
const codeSolution = '123456';
const targetDate = new Date('2020-01-01T00:00:00');
const server = 'http://192.168.1.90:4000'

console.log('me = ' + clientId);

class App extends Component {
  constructor() {
    super();

    // this.state = {
    //   isRunning: localStorage.getItem('isRunning')?localStorage.getItem('isRunning'):true,
    //   route: localStorage.getItem('route')?localStorage.getItem('route'):'main',
    //   temperature1: 28,
    //   temperature2: 24,
    //   // buttonPressed: false,
    // }

    this.state = {
      isRunning: true,
      route: 'main',
      temperature1: 20,
      temperature2: 20,
      isListening: false,
      // buttonPressed: false,
    }

    this.eventSource = new EventSource(new URL('/events', server));

    this.handleButtonPressed = this.handleButtonPressed.bind(this);
    this.handleTemperature1 = this.handleTemperature1.bind(this);
    this.handleTemperature2 = this.handleTemperature2.bind(this);
    this.checkTemperature = this.checkTemperature.bind(this);
    this.checkCode = this.checkCode.bind(this);
    // this.click = this.click.bind(this);
  }

  checkCode(code) {
    if (code.toLowerCase() === codeSolution) {
      setTimeout(() => {
        this.setState({
          // route: 'win',
          isRunning: false
        })
      }, 500);
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
    if (this.state.route === 'countdown') {
      this.setState({ route: 'temperature' });
    }
  }

  checkTemperature() {
    if (this.state.route === 'temperature' && (this.state.temperature1 >= targetTemperature && this.state.temperature2 >= targetTemperature)) {
      setTimeout(() => {
        this.setState({
          route: 'code'
        });
      }, 2000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.route === 'temperature') {
      this.checkTemperature();
    }

    if ((this.state.route !== prevState.route
      || this.state.isRunning !== prevState.isRunning
      || this.state.temperature1 !== prevState.temperature1
      || this.state.temperature2 !== prevState.temperature2)
      && this.state.senderId === clientId) {
      console.log('pushing new state to server');
      fetch(new URL('/state', server), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      });
    }
  }

  componentDidMount() {

    // https://alligator.io/nodejs/server-sent-events-build-realtime-app/
    if (!this.state.isListening) {
      this.eventSource.onopen = (event) => {
        // console.log("Connection to server opened.");
        // console.log('eventSource.readyState: ' + event.target.readyState);
      };

      this.eventSource.onmessage = (event) => {
        // console.log('message received');
        // console.log(event);
        const parsedData = JSON.parse(event.data);
        // console.log('state from event');
        // console.log(parsedData);
        // console.log('me: ' + clientId + '; senderId: ' + parsedData.senderId);
        if (parsedData.senderId !== clientId) {
          console.log('updating state from server');
          this.setState(parsedData);
        }
      };
      this.setState({ isListening: true });
    }
  }

  render() {
    if (this.state.route === 'win') {
      return (<CustomFireworks width={3440} height={1440} />);
    } else {
      return (
        <FlexView vAlignContent='center' hAlignContent='center'>
          <Beacon onTemperature1Change={this.handleTemperature1} onTemperature2Change={this.handleTemperature2} onButtonPressed={this.handleButtonPressed} />
          {this.state.route === 'main' && <FlexView hAlignContent='center' basis='2000px' width='2000px' marginTop='-280px'><Logo /></FlexView>}
          {this.state.route === 'hack' && <Hack />}
          {this.state.route === 'countdown' && <FlexView><Countdown isRunning={this.state.isRunning} date={targetDate} fontsize='18em' /></FlexView>}
          {this.state.route === 'temperature' && <FlexView column basis='100vw'>
            <FlexView hAlignContent='center' basis='100vh'>
              <FlexView hAlignContent='left' marginRight='200px' basis='600px'><Gauge temperature={this.state.temperature1} max={30} min={20} /></FlexView>
              <FlexView hAlignContent='center' vAlignContent='center'><Countdown isRunning={this.state.isRunning} date={targetDate} fontsize='13em' /></FlexView>
              <FlexView hAlignContent='right' marginLeft='200px' basis='600px'><Gauge temperature={this.state.temperature2} max={30} min={20} /></FlexView>
            </FlexView></FlexView>}
          {this.state.route === 'code' && <FlexView column basis='100vw'>
            <FlexView vAlignContent='top' basis='34vh' />
            <FlexView hAlignContent='center' vAlignContent='center' basis='32vh'><Countdown isRunning={this.state.isRunning} date={targetDate} fontsize='13em' /></FlexView>
            <FlexView vAlignContent='center' hAlignContent='center' basis='17vh'>
              <CodeInput checkCode={this.checkCode} />
            </FlexView>
            <FlexView vAlignContent='bottom' basis='16vh' />
          </FlexView>}
        </FlexView>
      );
    }
  }
}

export default App;
