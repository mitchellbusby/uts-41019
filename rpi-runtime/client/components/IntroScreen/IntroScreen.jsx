import React, { Component } from 'react';

import SliderInstructionComponent from '../SliderInstructionComponent/SliderInstructionComponent';

class IntroScreenComponent extends Component {
  render() {

    let { setView } = this.props;

    return (
      <div className={'introScreenComponent'}>
        <h1>Get a Room!</h1>
        <h3>Purpose: Find a room to study in Building 11.</h3>
        <div className={'sliderWrapper'}>
          <SliderInstructionComponent />          
        </div>
        <div className={'instructions'}>
          <p>Results are sorted by the number of people in the room. Click the button to toggle sorting methods.</p>
          <p>Scroll through results by swiping the screen, and use the slider to filter by number of people in the room.</p>
        </div>
        <div>
          <button className={'perfect-button'} onClick={() => setView(3)}>Start</button>
        </div>
      </div>
    );
  }
}

IntroScreenComponent.defaultProps = {
  setView: function() {}
}

export default IntroScreenComponent;
