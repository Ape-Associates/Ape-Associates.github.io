import React from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../../ui/layouts/App.jsx';
import Blog from '../../api/blogs/blog.js';

export default withTracker(() => {
    const visibleHandle = Meteor.subscribe('blogs.visible');
    const myDraftsHandle = Meteor.subscribe('blogs.myDrafts');

    return {
        // TODO: implement users
        // user: Meteor.user(),
        loading: !visibleHandle.ready() || !myDraftsHandle.ready(),
        connected: Meteor.status().connected,
        blogs: Blog.find({ $or: [
            { isDraft: false },
            { isDraft: true, userId: Meteor.userId() }
        ]}, { sort: { createdAt: -1 } }).fetch(),
        latest: Blog.findOne({ isDraft: false }, { sort: { createdAt: -1} })
    };
})(App);
