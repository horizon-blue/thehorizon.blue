import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ImageGrid extends PureComponent {
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
    };

	render = () => {
        const { src, alt } = this.props;
		return (
            <Link to="/albumn/foo/bar/1">
                <div className="image-grid-container">
                    <img src={src} alt={alt} width={150}/>
                </div>
            </Link>
        );
	}
}

export default ImageGrid;