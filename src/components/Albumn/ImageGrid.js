import React, { PureComponent } from 'react';

class ImageGrid extends PureComponent {
	render = () => {
		return (
        <div className="image-grid-container">
            <img src="https://avatars1.githubusercontent.com/u/18493382?v=4&s=460" alt="test" width={150}/>
        </div>
        );
	}
}

export default ImageGrid;