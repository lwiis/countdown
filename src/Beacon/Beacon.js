import React, { Component } from 'react';
import ReactModal from 'react-modal';

// import './Beacon.css';

class Beacon extends Component {

    // https://www.espruino.com/Pixl.js+Wireless+Temperature+Display
    // https://webbluetoothcg.github.io/web-bluetooth/scanning.html

    // this requires Chrome + experimental web features!

    constructor() {
        super();
        this.state = {
            showModal: true,
            authorised: false
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    calculateDistance (rssi, txPower) {
        if (rssi === 0) {
            return -1.0; // if we cannot determine accuracy, return -1.
          }
        
          let ratio = rssi*1.0/txPower;

          if (ratio < 1.0) {
            return Math.pow(ratio,10);
          } else {
            return (0.89976)*Math.pow(ratio,7.7095) + 0.111;
          }
    }

    clickHandler() {
        this.setState({ 
            showModal: false,
            authorised: true
        });

        this.bluetoothScan();
    }

    componentDidMount() {
        console.log('Beacon componentDidMount');
        if(this.state.authorised) {
            this.bluetoothScan();
        }

        this.setState({ 
            showModal: true,
            authorised: true
        });
    }

    componentWillUnmount() {
        console.log('Beacon componentWillUnmount');
    }

    bluetoothScan() {
        navigator.bluetooth.requestLEScan({
            // acceptAllAdvertisements: true,
            filters: [{ name: 'Puck.js 0f06' }, { name: 'Puck.js d06a' }],
            keepRepeatedDevices: true
        }).then(() => {
            navigator.bluetooth.addEventListener('advertisementreceived', event => {

                let distance = this.calculateDistance(event.rssi, -60);

                let data = event.manufacturerData.get(0x590);

                if(data) {
                    let temperature = data.getInt8(1);
                    let battery = data.getUint8(0);
                    let button = data.getInt8(2);
                    if(button) {
                        this.props.onButtonPressed();
                    }
                    console.log(event.name + ': temperature=' + temperature + '; battery=' + battery + '; distance=' + distance + '; button=' + button);
                    // console.log('battery = ' + battery);
                    switch (event.name) {
                        case 'Puck.js 0f06':
                            this.props.onTemperature1Change(temperature);
                            break;
                        case 'Puck.js d06a':
                        default:
                            this.props.onTemperature2Change(temperature);
                            break;
                    }
                }
            });
        });
    }

    render() {
        return (

            <div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                >
                    <button onClick={this.clickHandler}>Scan</button>
                </ReactModal>
            </div>

        );
    }
}

export default Beacon;