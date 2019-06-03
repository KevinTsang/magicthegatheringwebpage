import React from 'react';
const uuidv1 = require('uuid/v1');

export default function Card(props) {
    return (
        <div className="card fadeIn">
            <div className="image"><img src={props.card.imageUrl} alt="Magic: The Gathering Card"/></div>
            <div className="card-header">
                <span>{props.card.name}</span>
                <span>{manaCost(props.card.manaCost, [])}</span>
            </div>
            <div>{props.card.originalType}</div>
            <div>{props.card.artist}</div>
            <div>{props.card.setName}</div>
        </div>
    );
}

/**
 * Creates an array of mana cost emoji elements
 * recursively based on the input string
 * assuming the input string is formatted properly e.g. {3}{U}
 * @param {string} manaString input string containing the mana cost of the card
 * @param {Array<HTMLSpanElement>} manaCostArray the HTML element array of the mana cost
 */
function manaCost(manaString, manaCostArray) {
    if (!manaString) {
        return manaCostArray.map((cost) => cost);
    } else {
        const mana = manaString.substring(0, 3);
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
    return manaCost(manaString.substring(3), manaCostArray);
}
