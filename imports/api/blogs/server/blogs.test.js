import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { ValidationError } from 'meteor/jagi:astronomy';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Blog from '../blog.js';


describe('Blogs', function() {
    chai.use(sinonChai);

    //TODO: This doesn't need to exist on server tests
    Meteor.methods({
        'test.resetDatabase': () => resetDatabase()
    });

    const testTitle = 'Test title';
    const testBody = 'Test body';

    describe('validators', function() {

        beforeEach(function(done) {
            Meteor.call('test.resetDatabase', done);
        });

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
        let errorSpy;
        let meteorUserStub

        before(function() {
            errorSpy = sinon.spy(console, 'error');

            meteorUserStub = sinon.stub(Meteor, 'userId');
            const fakeUserId = '12345678';
            meteorUserStub.returns(fakeUserId);
        });

        beforeEach(function(done) {
            Meteor.call('test.resetDatabase', done);
        });

        it('Is created in the \'Blogs\' collection', function() {
            const blog = new Blog({
                title: testTitle,
                body: testBody
            });
            blog.create();

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
            blog.create();
            const queryBlog = Blog.findOne({ title: testTitle });
            const time_diff = Math.abs(created_time.getTime() - queryBlog.get('createdAt').getTime());
            chai.assert.isBelow(time_diff, 1000);
        });

        it('Can be created as a draft', function() {
            let draft_blog = new Blog({
                title: testTitle,
                body: testBody,
                isDraft: true
            });
            draft_blog.create();

            const blog = Blog.findOne({ isDraft: true });
            chai.assert.equal(blog.get('title'), draft_blog.title);
            chai.assert.equal(blog.get('body'), draft_blog.body);
        });

        it('Is created with the authenticated user as the author', function() {
            let blog = new Blog({
                title: testTitle,
                body: testBody
            });
            blog.create();

            chai.expect(meteorUserStub).to.have.been.called()

            const queryBlog = Blog.findOne({});
            chai.assert.equal(queryBlog.get('author'), fakeUserId);

        });

        it('Can only be created by users allowed to post', function() {
            chai.assert.fail();
        });

        after(function() {
            meteorUserStub.restore();
            errorSpy.restore();
        });

    });

    describe('#rename', function() {
        let errorSpy;
        let meteorUserStub

        before(function() {
            errorSpy = sinon.spy(console, 'error');

            meteorUserStub = sinon.stub(Meteor, 'userId');
            const fakeUserId = '12345678';
            meteorUserStub.returns(fakeUserId);
        });

        beforeEach(function() {
            const blog = new Blog({
                title: testTitle,
                body: testBody
            });
            blog.create();
        });

        afterEach(function(done) {
            Meteor.call('test.resetDatabase', done);
        });

        it('Changes the title of the blog post', function() {
            const blog = Blog.findOne({ title: testTitle });
            const id = blog.get('_id');

            const newTitle = 'New title';
            blog.rename(newTitle);

            const stored_blog = Blog.findOne({ _id: id });
            chai.assert.equal(stored_blog.get('title'), newTitle);
        });

        before(function() {
            const other_user_id = '87654321';
            meteorUserStub.returns(other_user_id);
        });

        it('Can only be renamed by the blog author', function() {
            const blog = Blog.findOne();
            const newTitle = 'New title';
            blog.rename(newTitle);

            chai.expect(meteorUserStub).to.have.been.called()
            chai.expect(errorSpy).to.have.been.calledWith("Error renaming blog: only author can rename");

            const stored_blog = Blog.findOne();
            chai.assert.notEqual(stored_blog.get('title'), newTitle);
        });

        after(function() {
            meteorUserStub.restore();
            errorSpy.restore();
        });
    });

    describe('#modify', function() {
        let errorSpy;
        let meteorUserStub

        before(function() {
            errorSpy = sinon.spy(console, 'error');

            meteorUserStub = sinon.stub(Meteor, 'userId');
            const fakeUserId = '12345678';
            meteorUserStub.returns(fakeUserId);
        });

        beforeEach(function() {
            const blog = new Blog({
                title: testTitle,
                body: testBody
            });
            blog.create();
        });

        afterEach(function(done) {
            Meteor.call('test.resetDatabase', done);
        });

        it('Changes the content of the blog post', function() {
            const blog = Blog.findOne({ title: testTitle });
            const id = blog.get('_id');

            const newContent = 'Now there is some new content';
            blog.modify(newContent);

            const stored_blog = Blog.findOne({ _id: id });
            chai.assert.equal(stored_blog.get('body'), newContent);
        });

        it('Can only be modified by the blog author', function() {
            const other_user_id = '87654321';
            meteorUserStub.returns(other_user_id);

            const blog = Blog.findOne();
            const newContent = 'Now there is some new content';
            blog.modify(newContent);

            chai.expect(meteorUserStub).to.have.been.called()
            chai.expect(errorSpy).to.have.been.calledWith("Error modifying blog: only author can modify");

            const stored_blog = Blog.findOne();
            chai.assert.notEqual(stored_blog.get('body'), newContent);

            meteorUserStub.returns(fakeUserId);
        });

        after(function() {
            meteorUserStub.restore();
            errorSpy.restore();
        })
    });

    describe('#delete', function() {
        let errorSpy;
        let meteorUserStub

        before(function() {
            errorSpy = sinon.spy(console, 'error');

            meteorUserStub = sinon.stub(Meteor, 'userId');
            const fakeUserId = '12345678';
            meteorUserStub.returns(fakeUserId);
        });

        beforeEach(function() {
            const blog = new Blog({
                title: testTitle,
                body: testBody
            });
            blog.create();
        });

        afterEach(function(done) {
            Meteor.call('test.resetDatabase', done);
        });

        it('Removes the blog from the database', function() {
            let blog = Blog.findOne({ title: testTitle })
            const id = blog.get('_id');

            blog.delete();

            chai.assert.equal(Blog.findOne({ _id: id }), undefined);
        });

        it('Can only be deleted by the blog author', function() {
            const other_user_id = '87654321';
            meteorUserStub.returns(other_user_id);

            const blog = Blog.findOne();
            blog.delete();

            chai.expect(meteorUserStub).to.have.been.called()
            chai.expect(errorSpy).to.have.been.calledWith("Error deleting blog: only author can delete");

            const stored_blog = Blog.findOne();
            chai.assert.idDefined(stored_blog);

            meteorUserStub.returns(fakeUserId);
        });

        after(function() {
            meteorUserStub.restore();
            errorSpy.restore();
        });
    });

    describe('#equals', function() {
        beforeEach(function(done) {
            Meteor.call('test.resetDatabase', done);
        });

        it('Returns true if the two blogs are exactly the same', function() {
            let blog = new Blog({
                title: testTitle,
                body: testBody
            });
            blog.create();

            const queryBlog = Blog.findOne({ title: testTitle });

            chai.assert.isTrue(queryBlog.equals(queryBlog));
        });

        it('Returns false if the two blogs are not the same', function() {
            let blog_a = new Blog({
                title: testTitle,
                body: testBody
            });
            let blog_b = new Blog({
                title: testTitle,
                body: testBody
            });
            blog_a.create();
            blog_b.create();

            const blogs = Blog.find({ title: testTitle }).fetch();
            blog_a = blogs[0];
            blog_b = blogs[1];

            chai.assert.isFalse(blog_a.equals(blog_b));
        });

        it('Returns false if the object being compared to is not a blog', function() {
            const blog = new Blog({
                title: testTitle,
                body: testBody
            });
            const db_blog = blog.create();
            const pojo = {
                fake: "true"
            };
            chai.assert.isFalse(db_blog.equals(pojo));
        });
    });

});
