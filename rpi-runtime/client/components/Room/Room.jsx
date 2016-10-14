import React, { Component } from 'react';

class RoomComponent extends Component {
  render() {
    let { RoomName, PeopleCount, TimeFree, Temperature } = this.props;

    // TODO: better logic for this conversion
    let timeFreePrettyPrint =  `free for ${ TimeFree } hours`;

    return (
        <li className={'roomComponent'}>
          <h2>{ RoomName }</h2>
          <p>
            <span>{ PeopleCount } people there currently &nbsp;|&nbsp;</span>
            <span>{timeFreePrettyPrint}&nbsp;|&nbsp;</span>
            <span>{ Temperature } degrees</span>
          </p>
            <hr />
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
