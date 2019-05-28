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
        this.manaCost = this.manaCost.bind(this);
    }

    manaCost(manaCost, manaCostArray) {
        if (manaCost.length === 0) {
            return manaCostArray.map((cost) => cost);
        } else {
            const mana = manaCost.substring(0, 3);
            switch (mana) {
                case '{U}':
                    manaCostArray.push(<span className='water cost'>💧</span>);
                    break;
                case '{W}':
                    manaCostArray.push(<span className='light cost'>☀️</span>);
                    break;
                case '{R}':
                    manaCostArray.push(<span className='fire cost'>🔥</span>);
                    break;
                case '{G}':
                    manaCostArray.push(<span className='forest cost'>🌲</span>);
                    break;
                case '{B}':
                    manaCostArray.push(<span className='dark cost'>💀</span>);
                    break;
                default:
                    manaCostArray.push(<span className='neutral cost'>{mana.substring(1,2)}</span>);
                    break;
            }
        }
        return this.manaCost(manaCost.substring(3), manaCostArray);
    }

    render() {
        return (
            <div className="card">
                <div><img src={this.state.imageUrl} alt="Magic: The Gathering Card"/></div>
                <div>
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