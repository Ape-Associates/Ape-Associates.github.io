import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Class } from 'meteor/jagi:astronomy';

// Define the collection
// TODO: This should probably go in blog.js to hide the meteor functionality
class BlogsCollection extends Mongo.Collection {
    // Can override insert and remove here
    insert(blog, callback) {
        return super.insert(blog, callback);
    }
}
export const Blogs = new BlogsCollection('Blogs');
