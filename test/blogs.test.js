import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Mongo } from 'meteor/mongo';
import { chai } from 'meteor/practicalmeteor:chai';

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

    describe('#create', function() {
        it('Is created in the \'Blogs\' collection', function() {
            const queryBlog = Blog.findOne({ title: testTitle });
            chai.assert.equal(queryBlog.get('title'), testTitle);
            chai.assert.equal(queryBlog.get('body'), testBody);
        });
    });

    describe('#rename', function() {
        it('changes the title of the blog post', function() {
            let blog = Blog.findOne({ title: testTitle });
            const id = blog.get('_id');

            const newTitle = 'New title';
            blog.rename(newTitle);

            blog = Blog.findOne({ _id: id });
            chai.assert.equal(blog.get('title'), newTitle);
        });
    });

    describe('#modify', function() {
        it('changes the content of the blog post', function() {
            let blog = Blog.findOne({ title: testTitle });
            const id = blog.get('_id');

            const newContent = 'Now there is some new content';
            blog.modify(newContent);

            blog = Blog.findOne({ _id: id });
            chai.assert.equal(blog.get('body'), newContent);
        });
    });

    describe('#delete', function() {
        it('removes the blog from the database', function() {
            let blog = Blog.findOne({ title: testTitle })
            const id = blog.get('_id');

            blog.delete();

            chai.assert.equal(Blog.findOne({ _id: id }), undefined);
        });
    });

});
