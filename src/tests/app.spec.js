import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../pages/app';
var React = require('react');

describe('Tests for the main page component', () => {
    var component;
    var componentInstance;
    var cards;
    var mockFetch;
    
    beforeEach(() => {
        Enzyme.configure( {adapter: new Adapter() });
        cards = {
            cards: [{
                id: 'ba47b093-740d-5d4c-b2af-d7b039521d71',
                name: 'Rainbow Crow',
                manaCost:'{3}{U}',
                imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=22994&type=card',
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
            }]
        };
        component = mount(<App />);
        componentInstance = component.instance();
        // TODO: To make my testing more robust, I could double check the url
        // within load cards to ensure the URLs called are correct
        mockFetch = spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            headers: {
                get: (name) => cards.cards.length
            },
            json: () => Promise.resolve(cards)
        }));
    });

    it('Testing load cards fetches the mock card names above properly', async () => {
        await componentInstance.loadCards(0);
        component.update();
        expect(mockFetch).toHaveBeenCalled();
        var searchResults = component.find('.search-results').children();
        searchResults.forEach((card, i) => {
            var cardHeader = card.find('.card-header');
            var cardName = cardHeader.childAt(0).text();
            expect(cardName).toEqual(cards.cards[i].name);
        });
    });

    it('Testing loadCard if the image exists on the card', async () => {
        await componentInstance.loadCards(0);
        component.update();
        // fetch is called to retrieve the image from retrieveImageFromServer
        expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('Testing hasMore', async () => {
        expect(componentInstance.hasMore()).toBeTruthy();
        expect(component.state('totalCount')).toEqual(1);
        await componentInstance.loadCards(0);
        component.update();
        expect(mockFetch).toHaveBeenCalled();
        expect(component.state('totalCount')).toEqual(cards.cards.length);
        expect(componentInstance.hasMore()).toBeFalsy();
    });

    it('Testing findMatchingImageUrl if the image doesn\'t exist on the card', () => {
        componentInstance.findMatchingImageUrl(cards.cards[1], cards.cards);
        expect(mockFetch).toHaveBeenCalledWith(`https://api.magicthegathering.io/v1/cards?type=creature&name=${cards.cards[1].name}`);
    });

    it('Testing search', () => {
        var searchTerm = 'rainbow';
        component.setState({ name: searchTerm });
        component.find('#submit').simulate('click');
        expect(component.state('name')).toEqual(searchTerm);
        expect(mockFetch).toHaveBeenCalledWith(`https://api.magicthegathering.io/v1/cards?type=creature&pageSize=20&page=0&orderBy=name&name=${searchTerm}`);
    });

    it('Testing orderBy', () => {
        var button = component.find('#orderByArtist'); 
        button.simulate('click').simulate('change');
        expect(component.state('orderBy')).toEqual('artist');
        expect(mockFetch).toHaveBeenCalledWith(`https://api.magicthegathering.io/v1/cards?type=creature&pageSize=20&page=0&orderBy=artist`);
    });
});