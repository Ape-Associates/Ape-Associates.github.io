// Entry point of client application
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AppContainer from '../imports/ui/containers/AppContainer.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

Meteor.startup(() => {
    render(<AppContainer/>, document.getElementById('render-target'));
});
