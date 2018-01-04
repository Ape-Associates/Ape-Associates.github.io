import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../../ui/layouts/Header.jsx';
import Main from '../layouts/Main.jsx';
import Home from '../layouts/Home.jsx';
import BlogHome from '../layouts/BlogHome.jsx';
import About from '../layouts/About.jsx';
import Projects from '../layouts/Projects.jsx';

// App component - represents the entire App
export default class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <Main />
                </div>
            </BrowserRouter>
        )
    }
}
