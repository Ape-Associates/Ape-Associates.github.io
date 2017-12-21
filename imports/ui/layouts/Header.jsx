import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
                    <span onClick={this.login.bind(this)} className="header-text">Login</span>
                    <span onClick={this.register.bind(this)} className="header-text">Register</span>
                </div>
                <div className="nav-links">
                    <span className="header-text">Home</span>
                    <span className="header-text">Blog</span>
                    <span className="header-text">Products</span>
                    <span className="header-text">About</span>
                    <span className="header-text">contact</span>
                </div>
                <div className="social-media">
                    logos go here
                </div>
            </header>
        );
    }
}
