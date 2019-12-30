import React, { Component } from 'react';
// import FlexView from 'react-flexview';
import ReactPlayer from 'react-player';

class VideoComp extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <ReactPlayer url='./evildoctor.mp4' playing={true} volume={1} width='100%' height='100%' onEnded={this.props.onEnded}/>
        )
    }
}

export default VideoComp;