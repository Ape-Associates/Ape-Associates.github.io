import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import AccountsUIWrapper from '../components/AccountsUIWrapper.jsx';

// Header of the app with navigation components
export default class Header extends Component {

    login() {
        alert('You logged in');
    }

    register() {
        alert('You are going to register');
    }

    render() {
        return(
            <header className="header">
                <div className="auth">
                    <AccountsUIWrapper />
                </div>
                <div className="nav-links">
                    <div role="Button" className="header-text"><Link to="/">Home</Link></div>
                    <div role="Button" className="header-text"><Link to="/blog">Blog</Link></div>
                    <div role="Button" className="header-text"><Link to="/projects">Products</Link></div>
                    <div role="Button" className="header-text"><Link to="/about">About</Link></div>
                    <div role="Button" className="header-text"><Link to="/contact">Contact</Link></div>
                </div>
                <div className="social-media">
                    <div className="social-media-icon-container">
                        <img className="social-media-icon" src="/icons/Twitter_White.png" />
                    </div>
                    <div className="social-media-icon-container">
                        <img className="social-media-icon" src="/icons/Facebook_Logo.png" />
                    </div>
                    <div className="social-media-icon-container">
                        <img className="social-media-icon" src="/icons/Snapchat_Logo.png" />
                    </div>
                </div>
            </header>
        );
    }
}
