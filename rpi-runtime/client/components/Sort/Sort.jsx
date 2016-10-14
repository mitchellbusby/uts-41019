import React, { Component } from 'react';

class SortComponent extends Component {
    render() {
        let { sort, toggleSort } = this.props;

        let busyClass = sort ? "selected" : "not-selected"
        let timeClass = sort ? "not-selected" : "selected"

        return (
            <h2 className="sort">sorted by: <span onClick={this.props.toggleSort} className={busyClass}>busyness</span> <span className="not-selected">/</span> <span onClick={this.props.toggleSort} className={timeClass}>time free</span></h2>
        )
    }
}

SortComponent.defaultProps = {
    // In seconds
    state: 0,
    toggleState: function () {}
}

export default SortComponent;
