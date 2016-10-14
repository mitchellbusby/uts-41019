import React, { Component } from 'react';

var socket = require('socket.io-client')('http://localhost:3003');

import RoomComponent from '../Room/Room';

import { mapPotentiometerToPeopleThreshold } from '../../utils/Mappings';

class IndexComponent extends Component {
  constructor(props) {
    //Get props and set state from them
    super(props);

    this.state = {
        CurrentPagePosition: props.CurrentPagePosition,
        AvailableRooms: props.AvailableRooms,
        DisplayIsOn: props.DisplayIsOn,
        PotentiometerValue: props.PotentiometerValue,
    };
  }

  componentDidMount() {
    socket.on('connect', () => console.log('connected'));
    socket.on('send:arduino', this._receivePayloadFromArduino.bind(this));
    socket.on('send:roomdata', this._receivePayloadFromRoomData.bind(this));
  }

  render() {
    let { AvailableRooms, DisplayIsOn, PotentiometerValue } = this.state;

    let threshold = mapPotentiometerToPeopleThreshold(PotentiometerValue);

    AvailableRooms = AvailableRooms.filter(item => {
      return item.PeopleCount <= threshold;
    });

    if ( !DisplayIsOn ) {
      return (
        <section>
          Display is off...
        </section>
      )
    }


    if (AvailableRooms.length === 0) {
      return (
        <section className={'index-row'}>
          No rooms available that match your criteria...
        </section>
      );
    }

    return (
          <section>
            <h1>Free rooms in B11</h1>
            <h2>sorted by: busyness <span style={{"color":"grey"}}>/ time free</span></h2>
            <ul className={'rooms'}>
              { AvailableRooms.map((item, index) => {
                return <RoomComponent key={index} {...item} />
              })}
            </ul>
          </section>
    );
  }

  _receivePayloadFromArduino(payload) {
    // Update state from within here...
    // understanding can be exploded into individual management items
    console.log(payload);
    this.setState({
      PotentiometerValue: payload.slidingPotentiometer
    });
  }

  _receivePayloadFromRoomData(payload) {
    // Update more state from within here...
    console.log(payload);
    this.setState({
      AvailableRooms: payload.AvailableRooms
    });
  }
}

/*IndexComponent.props = {

}*/

IndexComponent.defaultProps = {
  items: [],
  DisplayIsOn: true,
  AvailableRooms: [],
  CurrentPagePosition: 0,
  PotentiometerValue: 0,
};

export default IndexComponent;
