import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Countdown from './Countdown/Countdown';
import CodeInput from './CodeInput/CodeInput';
import FlexView from 'react-flexview';
import Logo from './Logo/Logo';
import Gauge from './Gauge/Gauge';
import Hack from './Hack/Hack';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isRunning: true,
      route: 'main',
      temperature1: 28,
      temperature2: 24,
    }
    this.toggleCodeInputHidden = this.toggleCodeInputHidden.bind(this);
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
          isRunning: false
        });
        break;
    }
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
      <FlexView vAlignContent='center' hAlignContent='center' onClick={this.click}>
        {this.state.route === 'main' && <FlexView hAlignContent='center' basis='2000px' width='2000px' marginTop='-280px'><Logo /></FlexView>}
        {this.state.route === 'hack' && <Hack />}
        {this.state.route === 'countdown' && <FlexView><Countdown isRunning={this.state.isRunning} date={new Date('2020-01-01T00:00:00')} fontsize='18em' /></FlexView>}
        {this.state.route === 'temperature' && <FlexView column basis='100vw'>
          <FlexView hAlignContent='center' basis='100vh'>
            <FlexView hAlignContent='left' marginRight='200px' basis='600px'><Gauge temperature={this.state.temperature1} />}</FlexView>
            <FlexView hAlignContent='center' vAlignContent='center'><Countdown isRunning={this.state.isRunning} date={new Date('2020-01-01T00:00:00')} fontsize='13em' /></FlexView>
            <FlexView hAlignContent='right' marginLeft='200px' basis='600px'><Gauge temperature={this.state.temperature2} />}</FlexView>
          </FlexView>}
         </FlexView>
        }
        {this.state.route === 'code' && <FlexView column basis='100vw'>
          <FlexView vAlignContent='top' basis='34vh' />
          <FlexView hAlignContent='center' vAlignContent='center' basis='32vh'><Countdown isRunning={this.state.isRunning} date={new Date('2020-01-01T00:00:00')} fontsize='13em' /></FlexView>
          <FlexView vAlignContent='center' hAlignContent='center' basis='17vh'>
            <CodeInput />
          </FlexView>
          <FlexView vAlignContent='bottom' basis='16vh' />
        </FlexView>}
      </FlexView>
    );
  }
}

export default App;
