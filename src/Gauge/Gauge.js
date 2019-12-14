import React, { Component } from 'react';
import './Gauge.css';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Gauge extends Component {
    render() {
        return (
            <CircularProgressbar 
                maxValue={30}
                minValue={20}
                // value={this.props.temperature} text={`${this.props.temperature}˚C`}
                value={this.props.temperature} text={this.props.temperature}
                styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                //  rotation: 0.25,
                 
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'flat',
                 
                    // Text size
                    textSize: '50px',
                 
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,
                 
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                 
                    // Colors
                    pathColor: `rgba(62, 152, 199, ${(Math.max(this.props.temperature,20)-20) / 30})`,
                    textColor: 'rgb(114,186,218)',
                    trailColor: '#222',
                    backgroundColor: '#000',
                  })}
            />
        )
    }
}

export default Gauge;