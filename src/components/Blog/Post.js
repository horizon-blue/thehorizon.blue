import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Post extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
    };
    render() {
        return <div>{this.props.match.params.postLink}</div>;
    }
}

export default Post;
