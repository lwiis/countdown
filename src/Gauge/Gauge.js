import React, { Component } from 'react';
import './Gauge.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Gauge extends Component {
    heatMapColorforValue(temp) {
        /*
        0    : blue   (hsl(240, 100%, 50%))
        0.25 : cyan   (hsl(180, 100%, 50%))
        0.5  : green  (hsl(120, 100%, 50%))
        0.75 : yellow (hsl(60, 100%, 50%))
        1    : red    (hsl(0, 100%, 50%))
*/
        // let value = (Math.max(temp,20)-20)/10; // map [20,30] --> [0,1]
        let value = (Math.min(Math.max(temp,this.props.min),this.props.max)-this.props.min)/(this.props.max-this.props.min)/2; // map [20,30] --> [0,0.5]
        let h = (1.0 - value) * 240;
        return "hsl(" + h + ", 100%, 50%)";
    }

    render() {
        let color = this.heatMapColorforValue(this.props.temperature);

        return (            
            <CircularProgressbar
                maxValue={this.props.max}
                minValue={this.props.min}
                // value={this.props.temperature} text={`${this.props.temperature}˚C`}
                // value={this.props.temperature} text={this.props.temperature}
                value={this.props.temperature} text=''
                strokeWidth='15'
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
                    pathColor: color,
                    textColor: color,
                    trailColor: '#222',
                    backgroundColor: '#000',
                })}
            />
        )
    }
}

export default Gauge;