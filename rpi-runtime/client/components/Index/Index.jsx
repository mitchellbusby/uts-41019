import React, { Component } from 'react';

import RoomComponent from '../Room/Room';

class IndexComponent extends Component {
  render() {
    let { AvailableRooms } = this.props;

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
              return <RoomComponent />
            })}
          </ul>
          <div className={'indicator'}>
          </div>
      </section>
    );
  }
}

/*IndexComponent.props = {

}*/

IndexComponent.defaultProps = {
  items: [],
  DisplayIsOn: true,
  AvailableRooms: [{}, {}, {}],
};

export default IndexComponent;
