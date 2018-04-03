import React from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../../ui/layouts/App.jsx';
//import { Blogs } from '../../api/collections/blogs.js';

export default withTracker(() => {
    return {
        // TODO: implement users
        // user: Meteor.user(),
        connected: Meteor.status().connected,
        //blogs: Blogs.find({}).fetch(),
        // TODO: add blog posts to tracking
    };
})(App);
