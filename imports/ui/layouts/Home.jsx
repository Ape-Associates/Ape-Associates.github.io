import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Banner from './Banner.jsx';

// App component - represents the whole app
export default class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        //TODO: Add banner under HEader
        return (
            <div className="fullscreen">
                <Banner />
                <div className="main">
                    <div className="aa-about">
                        <div className="title">
                            <h2>About us</h2>
                        </div>
                        <div className="body-text">
                            <p>Ape Associates is a group of software developers passionate about software that matters. Particularly interested in game design and development, Ape Associates delivers products that are of the highest quality, and a joy to use.</p>
                        </div>
                    </div>
                    <div className="latest-post">
                        <div className="title">
                            <h2>Latest post</h2>
                        </div>
                        <div className="body-text">
                            //Todo: use api to render most previous blog post
                            <p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
                            blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah 
                            blah blah blah blah blah blah blah blah
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
