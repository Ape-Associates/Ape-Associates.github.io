import { Meteor } from 'meteor/meteor';

import Blog from '../blog.js';

Meteor.publish('blogs.visible', function blogsVisible() {
    return Blog.find({ isDraft: false });
});

Meteor.publish('blogs.myDrafts', function blogsMyDrafts() {
    if (!this.userId) {
        return this.ready();
    }

    return Blog.find({ author: this.userId, isDraft: true });
});
