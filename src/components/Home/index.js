import React, { Component } from 'react';
import { bind as Mousetrap } from 'mousetrap';
import { Row, Col } from 'antd';
import anime from 'animejs';
import Typed from 'typed.js';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';

// import PropTypes from 'prop-types';

import Logo from './Logo';
import './style.css';

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
    document.title = '天际蓝 | thehorizon.blue';
    this.timeline = anime.timeline();
    this.timeline
      .add({
        targets: this.logo.path,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
      })
      .add({
        targets: this.logo.container,
        translateY: ['10vh', 0],
        duration: 1000,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: this.logo.g,
        stroke: '#108ee9',
        duration: 1000,
        easing: 'easeInOutQuad',
        offset: '-=1000',
      })
      .add({
        targets: this.logo.bgSvg,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: this.title,
        opacity: [0, 1],
        translateY: ['-5vh', 0],
        duration: 500,
        easing: 'easeInOutQuad',
        offset: '-=500',
      })
      .add({
        targets: this.title,
        letterSpacing: 9,
        duration: 300,
        easing: 'easeInOutQuad',
        offset: '-=300',
      })
      .add({
        targets: [this.logo.typecontent, this.logo.typed],
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 500,
        begin: () => {
          this.typing = new Typed(this.logo.typed, {
            stringsElement: this.logo.typecontent,
            autoInsertCss: false,
            typeSpeed: 100,
          });
        },
      });
  }

  render() {
    return (
      <Row
        align="middle"
        justify="center"
        type="flex"
        className={classNames('fullscreen', this.props.className)}
      >
        <Col span={24} style={{ marginBottom: '20vh' }}>
          <Logo
            ref={logo => (this.logo = logo)}
            className="centered-horizontal"
            style={{ marginBottom: '3vh' }}
          />
          <div className="centered-horizontal">
            <h1
              ref={title => (this.title = title)}
              style={{
                letterSpacing: 1,
                fontFamily: 'consolas',
                wordBreak: 'break-all',
                color: '#4b84f4',
                textAlign: 'center',
              }}
            >
              天际蓝<MediaQuery minDeviceWidth={768}>
                {match => (match ? <span> | </span> : <br />)}
              </MediaQuery>thehorizon.blue
            </h1>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Home;
