import { check } from 'meteor/check';
import { Class, ValidationError } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

import { Blogs } from '../collections/blogs.js';

export default Blog = Class.create({
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
        safe_save() {
            const self = this;
            const promise =  new Promise(function(resolve, reject) {
                self.save((err, id) => {
                    if (err) {
                        console.error("Failed to save blog to db");
                        console.error(err);
                        reject(err);
                    } else {
                        self.reload()
                        resolve(self);
                    }
                });
            });
            return promise;
        },

        create() {
            this.validate({ fields: ['title', 'body'] }, err => {
                if (ValidationError.is(err)) {
                    console.error("Blog object is not valid");
                    console.error(err.error);
                }
            });
            //TODO: use meteor User framework
            this.author = 'Dummy Author';
            this.createdAt = new Date();
            return this.safe_save();
        },
        rename(title) {
            this.title = title;
            return this.safe_save();
        },
        modify(newContent) {
            this.body = newContent;
            return this.safe_save();
        },
        delete() {
            return this.remove();
        }
    }
});
