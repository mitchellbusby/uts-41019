import React, { Component } from 'react';

class SortComponent extends Component {
    render() {
        let { sort, setSort } = this.props;

        let busyClass = sort ? "selected" : "not-selected"
        let timeClass = sort ? "not-selected" : "selected"

        return (
            <h2 className="sort">sorted by: <span onClick={() => this.props.setSort(true)} className={busyClass}>busy-ness</span> <span className="not-selected">/</span> <span onClick={() => this.props.setSort(false)} className={timeClass}>time free</span></h2>
        )
    }
}

SortComponent.defaultProps = {
    // In seconds
    sort: 0,
    setSort: function () {}
}

export default SortComponent;
