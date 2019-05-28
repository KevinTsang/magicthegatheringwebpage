import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.card.name,
            manaCost: props.card.manaCost,
            imageUrl: props.card.imageUrl,
            originalType: props.card.originalType,
            artist: props.card.artist,
            setName: props.card.setName
        };
    }

    render() {
        return (
            <div className="card">
                <div><img src={this.state.imageUrl} alt="Magic: The Gathering Card"/></div>
                <div>
                    <span>{this.state.name}</span>
                    <span>{this.state.manaCost}</span>
                </div>
                <div>{this.state.originalType}</div>
                <div>{this.state.artist}</div>
                <div>{this.state.setName}</div>
            </div>
        );
    }
} 