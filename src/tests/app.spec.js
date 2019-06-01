import App from '../pages/app';
var React = require('react');
var createComponent = require('react-unit');

describe('Tests for the main page component', () => {
    var component;
    var cards;
    
    beforeEach(() => {
        cards = [{
            id: 'ba47b093-740d-5d4c-b2af-d7b039521d71',
            name: 'Rainbow Crow',
            manaCost:'{3}{U}',
            set: 'INV',
            setName: 'Invasion',
            artist: 'Edward P. Beard, Jr.',
            type: 'Creature - Bird',
            originalType: 'Creature - Bird',
        }, {
            id: '9730d8a2-7bab-554a-ae9b-c3e8194be522',
            name: 'Rainbow Efreet',
            manaCost: '{3}{U}',
            set: 'VIS',
            setName: 'Visions',
            artist: 'Nathalie Hertz',
            type: 'Creature - Efreet',
            originalType: 'Summon - Efreet',
        }];
        component = createComponent(<App />);
    });

    it('Testing render', () => {
        console.log(component);
    });
});