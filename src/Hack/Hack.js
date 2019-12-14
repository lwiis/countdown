import React, { Component } from 'react';
import './Hack.css';
import FlexView from 'react-flexview'
import pattern from './pattern.jpg';

class Hack extends Component {
    render() {
        return (
            <FlexView hAlignContent='center' className='hack'>
                <FlexView hAlignContent='left' className='hackleft'/>
                {/* <FlexView vAlignContent='center' id='middle'/> */}
                <FlexView hAlignContent='center'><img src={pattern} alt='' className='hackimage'/></FlexView>
                <FlexView hAlignContent='right' className='hackright'/>
            </FlexView>
        )
    }
}

export default Hack;