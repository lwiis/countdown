import React, { Component } from 'react';
import './Logo.css';
import FlexView from 'react-flexview';

class Logo extends Component {
    render() {

        return (
            <FlexView>
                <img src={require('./logo.gif')} alt='' />
            </FlexView>
        )
    }
}

export default Logo;