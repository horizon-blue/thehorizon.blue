import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
    render() {
        console.log(this.props);
        return <div>{this.props.match.params.postLink}</div>;
    }

    static get propTypes() {
        return {
            history: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired,
        };
    }
}

export default Post;
