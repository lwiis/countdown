import React, { Component } from 'react';
import './Hack.css';
import FlexView from 'react-flexview'
import pattern from './pattern.jpg';
import VideoComp from './VideoComp/VideoComp';
import ReactModal from 'react-modal';

class Hack extends Component {
    constructor() {
        super();
        this.state = {
            showVideoModal: false,
        };
    }

    componentDidMount() {
        setTimeout(()=>this.setState({ showVideoModal: true }), 5000);
    }

    render() {
        return (
            <FlexView hAlignContent='center' className='hack'>
                <FlexView hAlignContent='left' className='hackleft' />
                {/* <FlexView vAlignContent='center' id='middle'/> */}
                <FlexView hAlignContent='center'>
                    <img src={pattern} alt='' className='hackimage' />
                    <ReactModal
                        isOpen={this.state.showVideoModal}
                        contentLabel="Minimal Modal Example"
                        ariaHideApp={false}
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                        <VideoComp onEnded={this.props.handleEndVideo}/>
                    </ReactModal>
                </FlexView>
                <FlexView hAlignContent='right' className='hackright' />
            </FlexView>
        )
    }
}

export default Hack;