import React, { Component } from 'react';

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
              return <RoomComponent key={index} />
            })}
          </ul>
          <div className={'indicator'}>
          </div>
      </section>
    );
  }

  _receivePayloadFromArduino(payload) {
    // Update state from within here...
    // it can be exploded into individual management items

  }
}

/*IndexComponent.props = {

}*/

IndexComponent.defaultProps = {
  items: [],
  DisplayIsOn: true,
  AvailableRooms: [{}, {}, {}],
  CurrentPagePosition: 0,
};

export default IndexComponent;
