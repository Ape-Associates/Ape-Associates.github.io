import { check } from 'meteor/check';
import { Class, ValidationError } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

import { Blogs } from '../collections/blogs.js';

export default Blog = Class.create({
    //TODO: Figure out a way to wrap saves in promises without code duplication
    name: 'Blog',
    collection: Blogs,
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
            this.validate({ fields: ['title', 'body'] }, err => {
                if (ValidationError.is(err)) {
                    console.log("Blog object is not valid");
                    console.log(err.error);
                }
            });
            //TODO: use meteor User framework
            this.author = 'Dummy Author';
            this.createdAt = new Date();
            return this.save((err, id) => {
                if (err && err.error) {
                    console.log("Blog object could not save");
                    console.log(err.error);
                }
            });
        },
        rename(title) {
            this.title = title;
            this.validate({ fields: ['title']}, err => {
                if (ValidationError.is(err)) {
                    console.log("New title is not valid: " + title);
                    console.log(err.error);
                }
            });
            // Returns a number (don't know what it means)
            return this.save((err, id) => {
                if (err && err.error) {
                    console.log("Blog object could not save");
                    console.log(err.error);
                }
            });
        },
        modify(newContent) {
            this.body = newContent;
            this.validate({ fields: ['body']}, err => {
                if (ValidationError.is(err)) {
                    console.log("New title is not valid: " + title);
                    console.log(err.error);
                }
            });
            // Returns the object but it's not thennable
            return new Promise((resolve, reject) => {
                this.save((err, id) => {
                    if (ValidationError.is(err)) {
                        console.log("New title is not valid: " + title);
                        console.log(err.error);
                        reject(err);
                    } else {
                        resolve(this);
                    }
                });
            });
        },
        delete() {
            return this.remove();
        }
    }
});
