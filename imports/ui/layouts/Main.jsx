import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import Home from '../layouts/Home.jsx';
import BlogHome from '../layouts/BlogHome.jsx';
import About from '../layouts/About.jsx';
import Projects from '../layouts/Projects.jsx';

// Main component - represents the app's main content
export default class Main extends Component {
    render() {
        return(
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/blog" component={BlogHome} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/projects" component={Projects} />
                </Switch>
            </main>
        );
    }
}
