import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import InfiniteScroll from 'react-infinite-scroller';

import Card from '../src/shared/card/card';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            pageNumber: 0,
            hasMore: true,
            totalCount: 0,
            name: '',
        };

        this.loadCards = this.loadCards.bind(this);
        this.hasMore = this.hasMore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findMatchingImageUrl = this.findMatchingImageUrl.bind(this);
        this.search = this.search.bind(this);
    }

    hasMore() {
        return this.state.cards.length < this.state.totalCount;
    }

    loadCards(pageNumber) {
        let url = `https://api.magicthegathering.io/v1/cards?type=creature&pageSize=20&page=${pageNumber}`;
        url += '&name=' + this.state.name;
        fetch(url).then((results) => {
            if (pageNumber === 0) {
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

    findMatchingImageUrl(card) {
        for (let i = 0; i < this.state.cards.length; i++) {
            if (card.name === this.state.cards[i].name &&
                this.state.cards[i].imageUrl !== undefined) {
                return this.state.cards[i].imageUrl;
            }
        }
        return '';
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    search(event) {
        this.setState({
            cards: [],
            pageNumber: 0
        });
        event.preventDefault();
        this.loadCards(0);
    }

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
                </div>
                <div className="search-results">
                    {this.state.cards.map((card) => {
                        if (card.imageUrl === undefined) {
                            card.imageUrl = this.findMatchingImageUrl(card);
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