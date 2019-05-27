import React, { Component } from 'react';

export default class LoadingIndicator extends Component {
    render() {
        return (
            <div>
                <i className="fa fa-spinner fa-spin" /> Loading...
            </div>
        );
    }
}