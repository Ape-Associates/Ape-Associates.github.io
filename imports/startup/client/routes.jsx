import React from 'react';
import { BrowserRouter, Route, browserHistory } from 'react-router-dom';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';

export const renderRoutes = () => (
  <BrowserRouter history={browserHistory}>
    <Route exact path="/" component={AppContainer}/>
  </BrowserRouter>
);
