import { Meteor } from 'meteor/meteor';

import Blog from '../blog.js';

Meteor.publish('blogs.latest', function blogsLatest() {
    return Blog.findOne({
        isDraft: false
    },
    {
        sort: {
            createdAt: -1
        }
    });
});
