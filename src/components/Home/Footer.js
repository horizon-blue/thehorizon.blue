import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import className from 'classnames';

const Separator = props => <span className="separator">|</span>;

class Footer extends PureComponent {
    static propTypes = {
        relativeFooter: PropTypes.bool,
    };

    render = () => {
        const { relativeFooter } = this.props;
        return (
            <Row
                type="flex"
                justify="end"
                align="bottom"
                className={className('footer', { fixed: !relativeFooter })}
            >
                <Col>
                    © HorizonBlue {new Date().getFullYear()}<Separator />
                    <a href="https://github.com/Horizon-Blue">GitHub</a>
                    <Separator />
                    <a href="http://www.forestofhorizon.com/">天际林</a>
                </Col>
            </Row>
        );
    };
}

export default Footer;
