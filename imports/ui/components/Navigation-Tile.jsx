import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
            <div className="navigation-tile" style={this.style}>
                <div className="navigation-tile-title">{this.props.name}</div>
                <div className="navigation-tile-description">{this.props.description}</div>
            </div>
        )
    }

}
