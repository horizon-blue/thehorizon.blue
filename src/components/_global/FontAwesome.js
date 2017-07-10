import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class FontAwesome extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        className: PropTypes.object,
    };
    render = () => {
        const { className, name, ...rest } = this.props;
        return (
            <i
                className={classNames('fa', 'fa-' + name, className)}
                {...rest}
            />
        );
    };
}

export default FontAwesome;
