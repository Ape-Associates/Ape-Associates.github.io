import { Meteor } from 'meteor/meteor';

import Blog from '../blog.js';

Meteor.publish('blogs.visible', function blogsVisible() {
    return Blog.find({ isDraft: false }, { sort: { createdAt: -1 } });
});

Meteor.publish('blogs.latest', function blogsLatest() {
    return Blog.findOne({ isDraft: false }, { sort: { createdAt: -1 } });
});

Meteor.publish('blogs.byAuthor', function blogsByAuthor(authorId) {
    return Blog.find({ author: authorId, isDraft: false }, { sort: { createdAt: -1 } });
});

Meteor.publish('blogs.myDrafts', function blogsMyDrafts() {
    if (!this.userId) {
        return this.ready();
    }

    return Blog.find({ author: this.userId, isDraft: true }, { sort: { createdAt: -1 } });
});
