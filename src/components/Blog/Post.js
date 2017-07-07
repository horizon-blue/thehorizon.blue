import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
    };
    render() {
        console.log(this.props);
        return <div>{this.props.match.params.postLink}</div>;
    }
}

export default Post;
