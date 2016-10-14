import React, { Component } from 'react';

var socket = require('socket.io-client')('http://localhost:3003');

import RoomComponent from '../Room/Room';
import SortComponent from '../Sort/Sort'
import IntroScreenComponent from '../IntroScreen/IntroScreen';

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
        ButtonIsPressed: props.ButtonIsPressed,
        ButtonWasPressed: 0,
        SortMechanism: props.SortMechanism,
        CurrentView: props.CurrentView,
        ProximityValue: props.ProximityValue,
    };
  }

  componentDidMount() {
    socket.on('connect', () => console.log('connected'));
    socket.on('send:arduino', this._receivePayloadFromArduino.bind(this));
    socket.on('send:roomdata', this._receivePayloadFromRoomData.bind(this));
  }

  render() {
    let { AvailableRooms, DisplayIsOn, PotentiometerValue, SortMechanism, ButtonIsPressed, ButtonWasPressed } = this.state;
    // TODO:
    // Filter available rooms in here! and then skip to
    // the current page
    let { CurrentView } = this.state;

    if (CurrentView == 1) {
      return (
        <IntroScreenComponent />
      );
    }

    let threshold = mapPotentiometerToPeopleThreshold(PotentiometerValue);

    AvailableRooms = AvailableRooms.filter(item => {
      return item.PeopleCount <= threshold;
    });

    // Sort mechanism
    AvailableRooms = AvailableRooms.sort((a, b) => {
      if (SortMechanism) {
        if (a.PeopleCount < b.PeopleCount) {
          return -1;
        }
        else if (a.PeopleCount > b.PeopleCount) {
          return 1;
        }
        return 0;
      }
      else {
        if (a.TimeFree < b.TimeFree) {
          return -1;
        }
        else if (a.TimeFree > b.TimeFree) {
          return 1;
        }
        return 0;
      }
    }).reverse();

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
            <SortComponent sort={SortMechanism} setSort={this._setSort.bind(this)}/>
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

    let payloadObj = JSON.parse(payload);

    this.setState({
      PotentiometerValue: payloadObj.slidingPotentiometer,
      ButtonIsPressed: payloadObj.sortingButton,
      ProximityValue: payloadObj.ultrasonicRanger,
    });

    this._switchButtonState();
  }

  _receivePayloadFromRoomData(payload) {
    // Update more state from within here...
    this.setState({
      AvailableRooms: payload.AvailableRooms
    });
  }

  _switchButtonState() {
    if (this.state.ButtonIsPressed == 1 && this.state.ButtonWasPressed == 0) {
      this.setState({ButtonWasPressed: 1});
    }
    else if (this.state.ButtonIsPressed == 0 && this.state.ButtonWasPressed == 1) {
      // Change the sort mechanism!!
      this.setState({ButtonWasPressed: 0});
      this._toggleSort();
    }
  }

  _toggleSort() {
    // Changes the sort mechanism
      console.log("Sort toggled")
    this.setState({SortMechanism: !this.state.SortMechanism});
  }


  _setSort(useBusyness) {
    this.setState({SortMechanism: useBusyness});
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
  ButtonIsPressed: 0,
  SortMechanism: false,
  ProximityValue: 0,
  CurrentView: 0,
};

export default IndexComponent;
