import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Separator = props => <span className="separator">|</span>;

class Footer extends PureComponent {
    static propTypes = {
        relativeFooter: PropTypes.bool,
    };

    render = () => {
        return (
            <Row type="flex" justify="end" align="bottom" className="footer">
                <Col>
                    <Link to="/time-machine">V0.0.1</Link> © HorizonBlue{' '}
                    {new Date().getFullYear()}
                    <Separator />
                    <a href="https://github.com/Horizon-Blue">GitHub</a>
                    <Separator />
                    <a href="http://www.forestofhorizon.com/">天际林</a>
                </Col>
            </Row>
        );
    };
}

export default Footer;
