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
            showModal: true
        };

        this.bluetoothScan = this.bluetoothScan.bind(this);
    }

    calculateDistance (rssi, txPower) {
        if (rssi === 0) {
            return -1.0; // if we cannot determine accuracy, return -1.
          }
        
          let ratio = rssi*1.0/txPower;
          if (ratio < 1.0) {
            return Math.pow(ratio,10);
          }
          else {
            return   (0.89976)*Math.pow(ratio,7.7095) + 0.111;
          }
    }

    bluetoothScan() {
        this.setState({ showModal: false });

        navigator.bluetooth.requestLEScan({
            // acceptAllAdvertisements: true,
            filters: [{ name: 'Puck.js 0f06' }, { name: 'Puck.js d06a' }],
            keepRepeatedDevices: true
        }).then(() => {
            navigator.bluetooth.addEventListener('advertisementreceived', event => {
                // console.log(event);
                console.log(this.calculateDistance(event.rssi, -60));
                // console.log(event.manufacturerData);
                let data = event.manufacturerData.get(0x590);
                // console.log(data);
                let temperature = data.getInt8(1);
                // let battery = data.getUint8(0);
                // console.log('temperature = ' + temperature);
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
                    <button onClick={this.bluetoothScan}>Scan</button>
                </ReactModal>
            </div>

        );
    }
}

export default Beacon;