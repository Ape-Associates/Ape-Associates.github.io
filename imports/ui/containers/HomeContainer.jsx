import React from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Home from '../../ui/layouts/Home.jsx';
import Blog from '../../api/blogs/blog.js';

export default withTracker(() => {
    const visibleHandle = Meteor.subscribe('blogs.visible');
    const myDraftsHandle = Meteor.subscribe('blogs.myDrafts');

    return {
        loading: !visibleHandle.ready(),
        latest: Blog.findOne({ isDraft: false }, { sort: { createdAt: -1} })
    };
})(Home);
