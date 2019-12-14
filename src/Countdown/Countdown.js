import React, { Component } from 'react';
import './Countdown.css';

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      mins: 0,
      secs: 0,
    }
  }

  componentDidMount() {
    // update every half second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date()))/1000;
    //let diff = (new Date(endDate) - new Date())/1000;
    //console.log(new Date(endDate) - new Date()); 
    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      hours: 0,
      mins: 0,
      secs: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
      //console.log('hours: ' + timeLeft.hours + '; remaining: ' + diff);
    }
    if (diff >= 60) {
      timeLeft.mins = Math.floor(diff / 60);
      diff -= timeLeft.mins * 60;
      //console.log('minutes: ' + timeLeft.mins + '; remaining: ' + diff);
    }
    timeLeft.secs = diff;//.toFixed(3);

    // if((timeLeft.secs%2) && this.props.codeInputIsHidden) {
    //   this.props.toggleCodeInput();
    // } else if((timeLeft.secs%2===0) && !this.props.codeInputIsHidden) {
    //   this.props.toggleCodeInput();
    // }

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const countDown = this.state;

    return (
      <div className="Countdown" style={{fontSize:this.props.fontsize}}>

        <h1 className='digital'>{countDown.hours.toString().padStart(2,0)}:{countDown.mins.toString().padStart(2,0)}:{countDown.secs.toString().padStart(2,0)}</h1>

      </div>
    );
  }
}

export default Countdown;