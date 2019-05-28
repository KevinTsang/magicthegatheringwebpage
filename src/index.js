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
        };

        this.loadCards = this.loadCards.bind(this);
        this.hasMore = this.hasMore.bind(this);
    }

    hasMore() {
        return this.state.cards.length < this.state.totalCount;
    }

    loadCards(pageNumber) {
        fetch('https://api.magicthegathering.io/v1/cards?type=creature&pageSize=20&page=' + pageNumber).then((results) => {
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

    render() {
        return (
            <InfiniteScroll
                pageStart={this.state.pageNumber}
                initialLoad={true}
                loadMore={this.loadCards}
                hasMore={this.state.hasMore}
                loader={<div key={'loading'}><i className="fa fa-spinner fa-spin" />Loading...</div>}
                >
                <div className="container">
                    {this.state.cards.map((card) => {
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