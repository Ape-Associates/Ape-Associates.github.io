import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Mongo } from 'meteor/mongo';
import { chai } from 'meteor/practicalmeteor:chai';
import { ValidationError } from 'meteor/jagi:astronomy';

import Blog from '../imports/api/classes/blog.js';

describe('Blogs', function() {
    const testTitle = 'Test title';
    const testBody = 'Test body';

    beforeEach(function() {
        resetDatabase();
        const blog = new Blog({
            title: testTitle,
            body: testBody
        });
        blog.create();
    });

    describe('validators', function() {
        it('allows valid blogs', function() {
            const valid_blog = new Blog({
                title: 'Valid Title',
                body: 'Valid Body'
            });
            const save_func = function() {
                valid_blog.create();
            }
            chai.assert.doesNotThrow(save_func, /body|author|title|createdAt|/)
        });

        describe('title', function() {
            it('must be a string', function() {
                const bad_title_blog = new Blog({
                    title: true
                });
                bad_title_blog.validate({
                    fields: ['title'],
                    simulation: false,
                },
                err => {
                    chai.assert.isTrue(ValidationError.is(err));
                    // TODO: Find way to put error messages in one place
                    chai.assert.equal(err.reason, '"title" has to be a string');
                });
            });
            it('can\'t be more than 60 characters', function() {
                const bad_title_blog = new Blog({
                    title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                });
                bad_title_blog.validate({
                    fields: ['title'],
                    simulation: false,
                },
                err => {
                    chai.assert.isTrue(ValidationError.is(err));
                    // TODO: Find way to put error messages in one place
                    chai.assert.equal(err.reason, 'Blog title can be at most 60 characters long');
                });
            });

            it('can\'t be less than 3 characters', function() {
                const bad_title_blog = new Blog({
                    title: 'aa',
                });
                bad_title_blog.validate({
                    fields: ['title'],
                    simulation: false,
                },
                err => {
                    chai.assert.isTrue(ValidationError.is(err));
                    chai.assert.equal(err.reason, 'Blog title must be at least 3 characters long');
                });
            });

            it('Can be between 3 and 60 characters', function() {
                const minimum_title_blog = new Blog({
                    title: 'aaa'
                });
                minimum_title_blog.validate({
                    fields: ['title'],
                    simulation: false,
                },
                err => {
                    chai.assert.isUndefined(err);
                });

                const max_title_blog = new Blog({
                    title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                });
                max_title_blog.validate({
                    fields: ['title'],
                    simulation: false,
                },
                err => {
                    chai.assert.isUndefined(err);
                })

                const title_blog = new Blog({
                    title: 'A typical title for a typical blog post.'
                });
                title_blog.validate({
                    fields: ['title'],
                    simulation: false,
                },
                err => {
                    chai.assert.isUndefined(err);
                });
            })
        });

        describe('body', function() {
            it('must be a string', function() {
                const bad_body_blog = new Blog({
                    body: true
                });
                bad_body_blog.validate({
                    fields: ['body'],
                    simulation: false,
                },
                err => {
                    chai.assert.isTrue(ValidationError.is(err));
                    // TODO: Find way to put error messages in one place
                    chai.assert.equal(err.reason, '"body" has to be a string');
                });
            });
            it('can\'t be more than 16384 characters', function() {
                let bad_body = "";
                for (let i = 0; i < 16385; i++) {
                    bad_body += "a";
                }

                const bad_body_blog = new Blog({
                    body: bad_body
                });

                bad_body_blog.validate({
                    fields: ['body'],
                    simulation: false,
                },
                err => {
                    chai.assert.isTrue(ValidationError.is(err));
                    // TODO: Find way to put error messages in one place
                    chai.assert.equal(err.reason, 'Blog post can be at most 16384 characters long');
                });
            });

            it('can be less than or equal to 16384 characters', function() {
                let long_body = "";
                for (let i = 0; i < 16384; i++) {
                    long_body += "a";
                }
                const long_blog = new Blog({
                    body: long_body
                });

                let med_body = "";
                for (let i = 0; i < 3000; i++) {
                    long_body += "a";
                }
                const med_blog = new Blog({
                    body: med_body
                });

                let short_body = "a";
                const short_blog = new Blog({
                    body: short_body
                });
                long_blog.validate({
                    fields: ['body'],
                    simulation: false,
                },
                err => {
                    chai.assert.isUndefined(err);
                });

                med_blog.validate({
                    fields: ['body'],
                    simulation: false,
                },
                err => {
                    chai.assert.isUndefined(err);
                });

                short_blog.validate({
                    fields: ['body'],
                    simulation: false,
                },
                err => {
                    chai.assert.isUndefined(err);
                });
            });
        });
    });

    describe('#create', function() {
        it('Is created in the \'Blogs\' collection', function() {
            const queryBlog = Blog.findOne({ title: testTitle });
            chai.assert.equal(queryBlog.get('title'), testTitle);
            chai.assert.equal(queryBlog.get('body'), testBody);
        });

        it('Is created with a current timestamp', function() {
            let blog = new Blog({
                title: testTitle,
                body: testBody
            });
            const created_time = new Date();
            blog = blog.create();
            const time_diff = Math.abs(created_time.getTime() - blog.get('createdAt').getTime());
            chai.assert.isBelow(time_diff, 1000);
        })
    });

    describe('#rename', function() {
        it('Changes the title of the blog post', function() {
            let blog = Blog.findOne({ title: testTitle });
            const id = blog.get('_id');

            const newTitle = 'New title';
            blog.rename(newTitle);

            blog = Blog.findOne({ _id: id });
            chai.assert.equal(blog.get('title'), newTitle);
        });
    });

    describe('#modify', function() {
        it('Changes the content of the blog post', function() {
            let blog = Blog.findOne({ title: testTitle });
            const id = blog.get('_id');

            const newContent = 'Now there is some new content';
            blog.modify(newContent);

            blog = Blog.findOne({ _id: id });
            chai.assert.equal(blog.get('body'), newContent);
        });
    });

    describe('#delete', function() {
        it('Removes the blog from the database', function() {
            let blog = Blog.findOne({ title: testTitle })
            const id = blog.get('_id');

            blog.delete();

            chai.assert.equal(Blog.findOne({ _id: id }), undefined);
        });
    });

});
