import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from '../shared/card/card';
var React = require('react');

describe('Tests for the card component', () => {
    var component;
    var componentInstance;
    var card;
    
    beforeEach(() => {
        Enzyme.configure( {adapter: new Adapter() });
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
        component = mount(<Card key={card.id} card={card} />);
        componentInstance = component.instance();
    });

    it('expect component to have all the properties of the card passed in', () => {
        expect(component).toBeTruthy();
        var cardProperties = component.find('.card').children();
        expect(card.originalType).toEqual(cardProperties.at(2).text());
        expect(card.artist).toEqual(cardProperties.at(3).text());
        expect(card.setName).toEqual(cardProperties.at(4).text());
    });

    it('expect to display name and manaCost properly', () => {
        var cardHeader = component.find('.cardHeader').children();
        var cardName = cardHeader.at(0).text();
        var manaCost = cardHeader.at(1).text();
        expect(cardName).toEqual(card.name);
        expect(manaCost).toEqual('3💧');
    })
});