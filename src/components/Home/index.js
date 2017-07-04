import React, { Component } from 'react';
import { bind as Mousetrap } from 'mousetrap';
import { Row, Col } from 'antd';
import anime from 'animejs';
import Typist from 'react-typist';
import classNames from 'classnames';
// import PropTypes from 'prop-types';

import Logo from './Logo';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // static get propTypes() {
  //   return {
  //     data: PropTypes.shape({
  //       loading: PropTypes.bool.isRequired,
  //       test: PropTypes.string,
  //     }).isRequired,
  //   };
  // }

  componentWillMount() {
    // The special hotkeys to enter the main website
    Mousetrap('up down left right up down left right', () =>
      this.props.history.push('/about')
    );
  }

  componentDidMount() {
    this.timeline = anime.timeline();
    this.timeline
      .add({
        targets: this.logo.path,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: function(el, i) {
          return i * 250;
        },
      })
      .add({
        targets: this.logo.container,
        translateY: ['10vh', 0],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 300,
      })
      .add({
        targets: this.logo.g,
        stroke: '#108ee9',
        duration: 1000,
        easing: 'easeInOutQuad',
        offset: '-=1000',
      });
  }

  render() {
    return (
      <div
        className={classNames('fullscreen', 'centered', this.props.className)}
      >
        <Row align="middle" justify="center" type="flex">
          <Col span={24}>
            <Logo ref={logo => (this.logo = logo)} className="centered" />
          </Col>
        </Row>
        <Row align="middle" justify="center" type="flex">
          <Col span={24} />
        </Row>
      </div>
    );
  }
}

export default Home;
