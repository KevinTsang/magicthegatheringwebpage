import Card from '../shared/card/card';
var React = require('react');
var createComponent = require('react-unit');

describe('Tests for the card component', () => {
    var component;
    var card;
    
    beforeEach(() => {
        card = {
            id: 'ba47b093-740d-5d4c-b2af-d7b039521d71',
            name: 'Rainbow Crow',
            manaCost:'{3}{U}',
            set: 'INV',
            setName: 'Invasion',
            artist: 'Edward P. Beard, Jr.',
            type: 'Creature - Bird',
            originalType: 'Creature - Bird',
        };
        component = createComponent(<Card key={card.id} card={card} />);
    });

    it('expect component to have all the properties of the card passed in', () => {
        expect(component).toBeTruthy();
        expect(component.texts[0]).toEqual(card.name);
        expect(component.texts[3]).toEqual(card.type);
        expect(component.texts[4]).toEqual(card.artist);
        expect(component.texts[5]).toEqual(card.setName);
    });

    it('expect to display manaCost properly', () => {
        var manaElement = component.findByQuery('.cardHeader > span')[1];
        expect(manaElement.text).toEqual(component.texts[1]+component.texts[2]);
    })
});