import React, { Component } from 'react';


class IntroScreenComponent extends Component {
  render() {
    return (
      <div className={'introScreenComponent'}>
        <h1>Get a Room!</h1>
        <p>Purpose: Find a room to study in Building 11.</p>
        <p>Results are sorted by the number of people in the room. Click the button to toggle sorting methods.</p>
        <p>Scroll through results by swiping the screen, and use the slider to filter by number of people in the room.</p>
      </div>
    );
  }
}

export default IntroScreenComponent;
