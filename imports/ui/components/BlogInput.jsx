import React, { Component } from 'react';

import Blog from '../../api/blogs/blog.js';

// Navigation Tile component - exists on home page as appealing link to other pages
export default class BlogInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogTitle: '',
            blogContent: ''
        }
    }

    handleTitleChange(event) {
        this.setState({ blogTitle: event.target.value });
    }

    handleContentChange(event) {
        this.setState({ blogContent: event.target.value });
    }

    discardBlog() {
        alert("Coming soon...");
    }

    publishBlog() {
        const blog = new Blog({
            title: this.state.blogTitle,
            body: this.state.blogContent
        });
        blog.create();
    }

    saveAsDraft() {
        alert("Coming soon...");
    }



    render() {
        return(
            <div className="blog-input-wrapper">
                <div className="blog-input-title-wrapper">
                    <label htmlFor="blog-title-input" className="blog-input-label">Title</label>
                    <input value={this.state.blogTitle} onChange={this.handleTitleChange.bind(this)} type="text" id="blog-title-input" placeholder="Write a title for your blog post..."></input>
                </div>
                <div className="blog-input-body-wrapper">
                    <label htmlFor="blog-body-input" className="blog-input-label">Body</label>
                    <textarea value={this.state.blogContent} onChange={this.handleContentChange.bind(this)} id="blog-body-input" placeholder="Write your blog post here..."></textarea>
                </div>
                <div className="blog-input-actions">
                    <button className="button red-button" onClick={this.discardBlog.bind(this)}>Discard</button>
                    <button className="button green-button" onClick={this.publishBlog.bind(this)}>Publish</button>
                    <button className="button" onClick={this.saveAsDraft.bind(this)}>Save as Draft</button>
                </div>
            </div>
        )
    }



}
