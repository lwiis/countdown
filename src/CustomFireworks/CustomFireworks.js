import React from 'react';
//import { Fireworks } from 'fireworks/lib/react'
import Fireworks from 'fireworks-react';
import FlexView from 'react-flexview/lib';

function CustomFireworks() {
    //   let fxProps = {
    //     count: 3,
    //     interval: 200,
    //     colors: ['#cc3333', '#4CAF50', '#81C784'],
    //     calc: (props, i) => ({
    //       ...props,
    //       x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
    //       y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
    //     })
    //   }

    return (
        <FlexView>
            {/* <Fireworks {...fxProps} /> */}
            <Fireworks width={3440} height={1440} style={{background:'rgb(1,1,1,1)'}} />
        </FlexView>
    );
}

export default CustomFireworks;
