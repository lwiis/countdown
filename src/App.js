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
      codeInputIsHidden: false,
      //logoIsHidden: false,
      gaugeIsHidden: true,
      route: 'main',
      temperature1: 28,
      temperature2: 24,
    }
    this.toggleCodeInputHidden = this.toggleCodeInputHidden.bind(this);
    this.click = this.click.bind(this);
  }

  click() {
    this.setState({
      route: 'countdown'
    });
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
        {this.state.route === 'main' && <Logo width='1000px' height='1000px' />}
        {this.state.route === 'countdown' && <Countdown date={new Date('2020-01-01T00:00:00')} fontsize='20em'/>
        
        /* // <FlexView vAlignContent='center' column marginTop='100px'>
      //   <FlexView hAlignContent='center'>
      //     <FlexView hAlignContent='left' basis={300} height={300} marginTop='75px' marginLeft='50px' marginRight='50px'>
      //       {!this.state.logoIsHidden && <Logo />}
      //       {!this.state.gaugeIsHidden && <Gauge temperature={this.state.temperature1}/>}
      //     </FlexView>
      //     <FlexView column hAlignContent='center'>
      //       <FlexView vAlignContent='center'>
      //         <Countdown date={new Date('2020-01-01T00:00:00')}
      //         // codeInputIsHidden={this.state.codeInputIsHidden} toggleCodeInput={this.toggleCodeInputHidden} 
      //         />
      //       </FlexView>
      //     </FlexView>
      //     <FlexView hAlignContent='right' basis={300} height={300} marginTop='75px' marginLeft='50px' marginRight='50px'>
      //       {!this.state.logoIsHidden && <Logo />}
      //       {!this.state.gaugeIsHidden && <Gauge temperature={this.state.temperature2}/>}
      //     </FlexView>
      //   </FlexView>
      //   <FlexView vAlignContent='bottom' hAlignContent='center'>
      //     {!this.state.codeInputIsHidden && <CodeInput />}
      //   </FlexView>
      // </FlexView> */}
      </FlexView>
    );
}
}

export default App;
