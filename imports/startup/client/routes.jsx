import React from 'react';
import { BrowserRouter, Route, browserHistory } from 'react-router-dom';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import Header from '../../ui/layouts/Header.jsx';

export const renderRoutes = () => (
    <BrowserRouter history={browserHistory}>
        <div className="fullscreen">
            <Header />
            <Route exact path="/" component={AppContainer} />
        </div>
    </BrowserRouter>
);
