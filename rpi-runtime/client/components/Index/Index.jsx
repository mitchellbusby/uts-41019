import React, { Component } from 'react';

var socket = require('socket.io-client')('http://localhost:3003');

import RoomComponent from '../Room/Room';

class IndexComponent extends Component {
  constructor(props) {
    //Get props and set state from them
    super(props);

    this.state = {
        CurrentPagePosition: props.CurrentPagePosition,
        AvailableRooms: props.AvailableRooms,
        DisplayIsOn: props.DisplayIsOn
    };
  }

  componentDidMount() {
    socket.on('connect', () => console.log('connected'));
    socket.on('send:arduino', this._receivePayloadFromArduino.bind(this));
    socket.on('send:roomdata', this._receivePayloadFromRoomData.bind(this));
  }

  render() {
    let { AvailableRooms, DisplayIsOn } = this.state;
    // TODO:
    // Filter available rooms in here! and then skip to
    // the current page

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
          <ul className={'rooms'}>
            { AvailableRooms.map((item,index) => {
              return <RoomComponent key={index} {...item} />
            })}
          </ul>
          <div className={'indicator'}>
          </div>
      </section>
    );
  }

  _receivePayloadFromArduino(payload) {
    // Update state from within here...
    // understanding can be exploded into individual management items
    console.log(payload);
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
};

export default IndexComponent;
