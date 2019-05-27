import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';

import Card from '../src/shared/card/card';
import LoadingIndicator from '../src/shared/loading-indicator/loading-indicator';

const mtg = require('mtgsdk');


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            loading: true,
        };
    }

    componentDidMount() {
        mtg.card.where({ type: 'creature', page: 1, pageSize: 20 }).then((cards) => {
            this.setState({
                cards: cards,
                loading: false,
            });
        });
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.loading ? (<LoadingIndicator />) :
                    this.state.cards.map((card, i) => {
                        return (<Card key={card.id} card={card} />);
                    })
                }
            </div>
        );
    }
}

ReactDOM.render(
    <MainPage />,
    document.getElementById('root')
);