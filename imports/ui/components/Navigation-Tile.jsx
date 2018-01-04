import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// Navigation Tile component - exists on home page as appealing link to other pages
export default class NavigationTile extends Component {
    constructor(props) {
        super(props);

        this.style = {
            backgroundImage: 'url(' + this.props.bg_image_src + ')',
        }
    }



    render() {
        return(
            <Link to={this.props.link} className="navigation-tile" style={this.style}>
                <div className="navigation-tile-title">{this.props.name}</div>
                <div className="navigation-tile-description">{this.props.description}</div>
            </Link>
        )
    }

}
