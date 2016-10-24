import React, { Component } from 'react';

class RoomComponent extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      RoomFormat: 0 
    }

  }

  render() {
    let { RoomName, PeopleCount, TimeFree, Temperature } = this.props;

    let { RoomFormat } = this.state;

    // Room format 0 for building style, format 1 for 

    let roomNameFormatted;

    if (RoomFormat == 0) {
      roomNameFormatted = RoomName;
    }
    else {

      let roomData = RoomName.split('.');

      roomNameFormatted = `Level ${roomData[1]}, Room ${roomData[2]}`; 
    }

    let timeFreePrettyPrint =  `free until ${ TimeFree }`;

    let peopleText = PeopleCount > 1 ? 'people' : 'person';

    return (
        <li className={'roomComponent'} onClick={this.handleClick.bind(this)}>
          <h2><i className={"fa fa-map-marker"} aria-hidden="true"></i> { roomNameFormatted }</h2>
          <p>
            <span><i className={"fa fa-users"} aria-hidden="true"></i> { PeopleCount } { peopleText } there currently&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <span><i className={"fa fa-clock-o"} aria-hidden="true"></i> { timeFreePrettyPrint }&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <span><i className={"fa fa-sun-o"} aria-hidden="true"></i> { Temperature }°C</span>
          </p>
            <hr />
        </li>
      )
  }

  handleClick() {
    
    let newRoomFormat;

    if (this.state.RoomFormat == 0) {
      newRoomFormat = 1;
    }
    else {
      newRoomFormat = 0;
    }

    this.setState({
      RoomFormat: newRoomFormat
    });

  }
}

RoomComponent.defaultProps = {
  // In seconds
  TimeFree: 200,
  RoomName: 'CB11.06.11',
  Rank: 'Best',
  Temperature: '22C',
  PeopleCount: 2
}

export default RoomComponent;
