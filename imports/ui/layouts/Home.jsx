import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Banner from './Banner.jsx';
import NavigationTile from '../components/Navigation-Tile.jsx';

// Home component - represents the home page
export default class Home extends Component {
    constructor(props) {
        super(props);
    }


    renderNavTiles() {
        console.log('hello world');
        const nav_tiles_props = [
            {
                'name': 'Blog',
                'description': 'See our blog posts',
                'link': '/blog',
                'bg_image_src': '/images/Blog_Image.jpg'
            },
            {
                'name': 'About AA',
                'description': 'Learn about who we are, and our vision',
                'link': '/about',
                'bg_image_src': '/images/About_Image.jpg'
            },
            {
                'name': 'Projects',
                'description': 'See what we\'re working on',
                'link': '/projects',
                'bg_image_src': '/images/Projects_Image.jpg'
            },
        ];
        return nav_tiles_props.map((tileProps, i) => {
            return(
                <NavigationTile
                    key={i}
                    name={tileProps.name}
                    description={tileProps.description}
                    link={tileProps.link}
                    bg_image_src={tileProps.bg_image_src}
                />
            )
        });

    }

    render() {
        return (
            <div className="aa-home">
                <Banner />
                <div className="main">
                    <div className="aa-about">
                        <div className="title">
                            <h2>About us</h2>
                        </div>
                        <div className="body-text">
                            <p>Ape Associates is a group of software developers passionate about software that matters. Particularly interested in game design and development, Ape Associates delivers products that are of the highest quality, and a joy to use.</p>
                        </div>
                    </div>
                    <div className="home-nav-tiles-container">
                        {this.renderNavTiles()}
                    </div>
                    <div className="latest-post">
                        <div className="title">
                            <h2>Latest post</h2>
                        </div>
                        <div className="body-text">
                            //Todo: use api to render most previous blog post
                            <p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
                                blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah 
                                blah blah blah blah blah blah blah blah
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
