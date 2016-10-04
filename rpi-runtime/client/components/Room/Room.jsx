import React, { Component } from 'react';

class RoomComponent extends Component {
  render() {
    let { RoomName, PeopleCount, TimeFree, Temperature, Rank } = this.props;

    // TODO: better logic for this conversion
    let timeFreePrettyPrint =  `${ Math.floor(TimeFree / 60) } hours free`;

    return (
        <li className={'roomComponent'}>
          <h3>{ RoomName }</h3>
          <p>
            <span>{ PeopleCount } people&nbsp;|&nbsp;</span>
            <span>{timeFreePrettyPrint}&nbsp;|&nbsp;</span>
            <span>{ Temperature }</span>
          </p>
          <p>{ Rank }</p>
        </li>
      )
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
