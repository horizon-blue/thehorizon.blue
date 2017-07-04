import React, { Component } from 'react';
import { bind as Mousetrap } from 'mousetrap';
import { Row, Col } from 'antd';
import anime from 'animejs';
import Typed from 'typed.js';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { CSSTransitionGroup } from 'react-transition-group';
import Login from '../Login';

// import PropTypes from 'prop-types';

import Logo from './Logo';
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { showLogin: false };
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
    Mousetrap('up down left right', () =>
      this.setState({ showLogin: !this.state.showLogin })
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
        targets: this.logo.typed,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 500,
        begin: () => {
          this.typing = new Typed(this.logo.typed, {
            strings: [
              '啊。^1000早上好，迷途的旅者。^1000<br />欢迎来到天空的尽头。^1000<br />不过，^1000还是请回吧。',
              '前方是名为天际的一片虚无之地。^1000<br />藤蔓肆虐，荆棘丛生。',
              '那是不应被打扰的一片领域。',
              '因此^1000，请回吧。^1000',
              '嗯？^1000执意前行吗？^1000<br />...真是没办法呢。^1000<br />那么^1000，请出示你的信物。',
            ],
            autoInsertCss: false,
            typeSpeed: 80,
            backSpeed: 50,
            startDelay: 1000,
            backDelay: 2000,
          });
        },
      });
  }

  render() {
    return (
      <Row
        justify="center"
        type="flex"
        className={classNames('fullscreen', this.props.className)}
      >
        <Col span={24} style={{ marginBottom: '20vh' }}>
          <Logo
            ref={logo => (this.logo = logo)}
            className="centered-horizontal"
          />
          <div className="centered-horizontal">
            <h1
              ref={title => (this.title = title)}
              style={{
                letterSpacing: 1,
                marginTop: '3vh',
                marginBottom: '3vh',
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
          <CSSTransitionGroup
            transitionName="login"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {this.state.showLogin &&
              <div
                className="centered-horizontal"
                ref={loginPanel => (this.loginPanel = loginPanel)}
              >
                <Login />
              </div>}
          </CSSTransitionGroup>
        </Col>
      </Row>
    );
  }
}

export default Home;
