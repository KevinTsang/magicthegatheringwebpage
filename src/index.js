import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import InfiniteScroll from 'react-infinite-scroller';

import Card from '../src/shared/card/card';


class App extends Component {
    baseUrl = `https://api.magicthegathering.io/v1/cards?type=creature`;

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            pageNumber: 0,
            hasMore: true,
            totalCount: 0,
            name: '',
            orderBy: 'name',
            searchedOnce: false
        };

        this.loadCards = this.loadCards.bind(this);
        this.hasMore = this.hasMore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findMatchingImageUrl = this.findMatchingImageUrl.bind(this);
        this.search = this.search.bind(this);
        this.orderBy = this.orderBy.bind(this);
        this.retrieveFromImageFromServer = this.retrieveFromImageFromServer.bind(this);
        this.retrieveImageLocally = this.retrieveImage.bind(this);
    }

    /**
     * Checks if the current number of cards loaded on the page is less 
     * than the amount available from the server 
     */
    hasMore() {
        return this.state.cards.length < this.state.totalCount;
    }

    /**
     * Fetches cards from the magic the gathering API and saves them to the cards array in state
     * @param {number} pageNumber next page number of results to retrieve from the Magic: The Gathering server
     */
    loadCards(pageNumber) {
        let url = this.baseUrl + `&pageSize=20&page=${pageNumber}`;
        url += '&orderBy=' + this.state.orderBy;
        if (this.state.name || this.state.searchedOnce) {
            url += '&name=' + this.state.name;
        }
        fetch(url).then((results) => {
            if (!pageNumber || pageNumber === 1) {
                this.setState({
                    totalCount: results.headers.get('Total-Count')
                });
            }
            return results.json();
        }).then((cardArray) => {
            const cards = cardArray.cards;
            this.setState({
                cards: this.state.cards.concat(cards),
                pageNumber: this.state.pageNumber + 1,
            });
        });
    }

    /**
     * Retrieves the first matching image from a card array
     * @param {Card} card The card that missing an imageUrl property
     * @param {Card[]} cardArray List of cards to try and find an imageUrl property to bind
     */
    retrieveImage(card, cardArray) {
        for (let i = 0; i < cardArray.length; i++) {
            if (card.name === cardArray[i].name &&
                cardArray[i].imageUrl !== undefined) {
                return cardArray[i].imageUrl;
            }
        }
        return '';
    }

    /**
     * Retrieves a card from the Magic: The Gathering server and returns back an imageUrl
     * @param {Card} card 
     */
    async retrieveFromImageFromServer(card) {
        await fetch(this.baseUrl + `&name=${card.name}`).then(
            results => results.json()).then((cardArray) => {
                return this.retrieveImage(card, cardArray);
            });
    }

    /**
     * If a card object is missing an imageUrl property,
     * then it finds a corresponding one from a variation that has the same name
     * from the cards array and saves it to the current card's imageUrl property
     * @param {Card} card 
     */
    findMatchingImageUrl(card, cardArray) {
        let imageUrl = this.retrieveImage(card, cardArray);
        if (!imageUrl) {
            imageUrl = this.retrieveFromImageFromServer(card);
        }

        return imageUrl;
    }

    /**
     * Sets the name of the card to search by from the search box
     * @param {event} event 
     */
    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    /**
     * Changes what parameter the cards are ordered by
     * @param {event} event Event that contains what parameter of the cards to order by for the results
     */
    orderBy(event) {
        this.setState({
            orderBy: event.target.value
        });
        this.search(event);
    }

    /**
     * Clears the current cards array for the new search results 
     * based on the new search box
     * @param {event} event Event that contains the search term for what cards to search for
     */
    search(event) {
        this.setState({
            cards: [],
            pageNumber: 0,
            searchedOnce: true,
        });
        this.loadCards(0);
    }

    /**
     * Renders the page with infinite scroll
     */
    render() {
        return (
            <InfiniteScroll
                pageStart={this.state.pageNumber}
                initialLoad={true}
                loadMore={this.loadCards}
                hasMore={this.state.hasMore}
                loader={<div className="loader" key={'loading'}><i className="fa fa-spinner fa-spin" />Loading...</div>}
                >
                <h1>Magic: The Gathering creature cards</h1>
                <div className="search-bar">
                    <input type="text" name="search" id="search" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
                    <input type="submit" value="Search" onClick={(e) => this.search(e)}/>
                    <span>Order by: </span>
                    <input type="radio" name="orderBy" value="name" checked={this.state.orderBy === "name"} onChange={e => this.orderBy(e)} />Name
                    <input type="radio" name="orderBy" value="setName" checked={this.state.orderBy === "setName"} onChange={e => this.orderBy(e)} />Set Name
                    <input type="radio" name="orderBy" value="artist" checked={this.state.orderBy === "artist"} onChange={e => this.orderBy(e)} />Artist
                </div>
                <div className="search-results">
                    {this.state.cards.map((card) => {
                        if (card.imageUrl === undefined) {
                            card.imageUrl = this.findMatchingImageUrl(card, this.state.cards);
                        }
                        if (card.originalType === undefined) {
                            card.originalType = card.type;
                        }
                        return (<Card key={card.id} card={card}/>);
                    })}
                </div>
            </InfiniteScroll>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);