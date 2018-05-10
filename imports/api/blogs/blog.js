import { check } from 'meteor/check';
import { Class, ValidationError } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

import { Blogs } from './blogs.js';

export default Blog = Class.create({
    name: 'Blog',
    collection: Blogs,
    fields: {
        title: {
            type: String,
            validators: [{
                type: 'minLength',
                param: 3,
                message: 'Blog title must be at least 3 characters long'
            }, {
                type: 'maxLength',
                param: 60,
                message: 'Blog title can be at most 60 characters long'
            }]
        },
        body: {
            type: String,
            validators: [{
                type: 'maxLength',
                // Maximum length is approximately 2000 words
                param: 16384,
                message: 'Blog post can be at most 16384 characters long'
            }]
        },
        isDraft: Boolean,
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
                        reject(Error(err));
                    } else {
                        self.reload()
                        resolve(self);
                    }
                });
            });
            return promise;
        },

        create() {
            this.author = Meteor.userId();
            this.createdAt = new Date();
            if (!this.isDraft) {
                this.isDraft = false;
            }
            return this.safe_save();
        },
        rename(title) {
            if (this.author == Meteor.userId()) {
                this.title = title;
                return this.safe_save();
            } else {
                console.error('Error renaming blog: only author can rename');
            }
        },
        modify(newContent) {
            if (this.author == Meteor.userId()) {
                this.body = newContent;
                return this.safe_save();
            } else {
                console.error('Error modifying blog: only author can modify');
            }
        },
        delete() {
            if (this.author == Meteor.userId()) {
                return this.remove();
            } else {
                console.error('Error deleting blog: only author can delete');
            }
        }
    },
    helpers: {
        equals(blog) {
            if (!blog.get) {
                return false;
            }
            return blog.get('_id') == this._id;
        }
    }
});
