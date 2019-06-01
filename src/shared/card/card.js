import React, { Component } from 'react';
const uuidv1 = require('uuid/v1');

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
        this.manaCost = this.manaCost.bind(this);
    }

    /**
     * Creates an array of mana cost emoji elements
     * recursively based on the input string
     * assuming the input string is formatted properly e.g. {3}{U}
     * @param {string} manaCost 
     * @param {Array<HTMLSpanElement>} manaCostArray 
     */
    manaCost(manaCost, manaCostArray) {
        if (!manaCost) {
            return manaCostArray.map((cost) => cost);
        } else {
            const mana = manaCost.substring(0, 3);
            switch (mana) {
                case '{U}':
                    manaCostArray.push(<span key={uuidv1()} role='img' aria-label='island'>💧</span>);
                    break;
                case '{W}':
                    manaCostArray.push(<span key={uuidv1()} role='img' aria-label='plain'>☀️</span>);
                    break;
                case '{R}':
                    manaCostArray.push(<span key={uuidv1()} role='img' aria-label='mountain'>🔥</span>);
                    break;
                case '{G}':
                    manaCostArray.push(<span key={uuidv1()} role='img' aria-label='forest'>🌲</span>);
                    break;
                case '{B}':
                    manaCostArray.push(<span key={uuidv1()} role='img' aria-label='swamp'>💀</span>);
                    break;
                default:
                    manaCostArray.push(<span key={uuidv1()} role='img' aria-label='neutral' className="neutral">{mana.substring(1,2)}</span>);
                    break;
            }
        }
        return this.manaCost(manaCost.substring(3), manaCostArray);
    }

    /**
     * Renders a single card consisting of a name, mana cost,
     * type, artist, and set name
     */
    render() {
        return (
            <div className="card fadeIn">
                <div className="image"><img src={this.state.imageUrl} alt="Magic: The Gathering Card"/></div>
                <div className="cardHeader">
                    <span>{this.state.name}</span>
                    <span>{this.manaCost(this.state.manaCost, [])}</span>
                </div>
                <div>{this.state.originalType}</div>
                <div>{this.state.artist}</div>
                <div>{this.state.setName}</div>
            </div>
        );
    }
} 