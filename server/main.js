import { Meteor } from 'meteor/meteor';

import Blog from '../imports/api/blogs/blog.js';
import publish_blogs from '../imports/api/blogs/server/publications.js';

Meteor.startup(() => {
    // code to run on server at startup
    publish_blogs();
    console.log("Server running");
});
