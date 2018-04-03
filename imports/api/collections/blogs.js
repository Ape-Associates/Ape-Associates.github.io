import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Class } from 'meteor/jagi:astronomy';

// Define the collection
export const Blogs = new Mongo.Collection('blogs');
export const Blog = Class.create({
    name: 'Blog',
    collection: 'Blogs',
    fields: {
        title: {
            type: String,
            validators: [{
                type: 'minLength',
                param: 3
            }, {
                type: 'maxLength',
                param: 60
            }]
        },
        body: String,
        author: String,
        createdAt: Date
    },
    meteorMethods: {
        create() {
         return this.save();
        },
        rename(title) {
            this.title = title;
            console.log("Validating new blog title");
            this.validate({ fields: ['title']}, err => console.log("New title is not valid: " + title));
            return this.save();
        },
        modify(newContent) {
            this.body = newContent;
            this.validate({ fields: ['title']}, err => console.log("New content is not valid"));
            return this.save();
        },
        delete() {
            return this.remove();
        }
    }
});
