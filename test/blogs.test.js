import { resetDatabase } from 'meteor/xolvio:cleaner';
import { chai } from 'meteor/practicalmeteor:chai';

import Blogs from '../imports/api/collections/blogs.js';
import Blog from '../imports/api/classes/blog.js';

describe('blogs', function() {
    const testTitle = 'Test title';
    const testBody = 'Test body';

    beforeEach(function() {
        resetDatabase();
        const blog = new Blog();
        blog.set({
            title: testTitle,
            body: testBody
        });
        blog.create();
    });

    describe('#create', function() {
        it('Is created in the \'Blogs\' collection', function() {
            const queryBlog = Blogs.findOne({ title: testTitle });
            chai.assert.equal(queryBlog.get('title'), testTitle);
            chai.assert.equal(queryBlog.get('body'), testBody);
        });
    });

    describe('#rename', function() {
        it('changes the title of the blog post', function() {
            const blog = Blogs.findOne({ title: testTitle });

            const newTitle = 'New title';
            blog.rename(newTitle);
            chai.assert.equal(blog.get('title'), newTitle);
        });
    });

    describe('#modify', function() {
        it('changes the content of the blog post', function() {
            const blog = Blogs.findOne({ title: testTitle });

            const newContent = 'Now there is some new content';
            blog.modify(newContent);

            chai.assert.equal(blog.get('body'), newContent);
        });
    });

    describe('#delete', function() {
        it('removes the blog from the database', function() {
            const blog = Blogs.findOne({ title: testTitle })

            blog.delete();
            chai.assert.equal(Blogs.findOne({ title: testTitle }), undefined);
        });
    });

});
