import React, { Component } from 'react';
import { bind as Mousetrap } from 'mousetrap';
import { Row, Col } from 'antd';
import anime from 'animejs';
import Typed from 'typed.js';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import Router from './Router';

// import PropTypes from 'prop-types';

import Logo from './Logo';
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonState: 0 };
    this.handleHiddenButtonPress = this.handleHiddenButtonPress.bind(this);
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
    Mousetrap('left right right left', () =>
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
              '啊。^1000早上好，迷途中的旅者。^1000<br />欢迎来到天空的尽头。^1000<br />不过，^1000还是请回吧。',
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

  handleHiddenButtonPress(buttonIndex) {
    const buttonState = this.findNextButtonState(
      this.state.buttonState,
      buttonIndex
    );
    if (buttonState === 5)
      this.setState({ showLogin: !this.state.showLogin, buttonState: 0 });
    else this.setState({ buttonState });
  }

  findNextButtonState(state, buttonIndex) {
    switch (state) {
      case 0:
      case 2:
        return buttonIndex ? 1 : 2;
      case 1:
        return buttonIndex ? 1 : 3;
      case 3:
        return buttonIndex ? 1 : 4;
      case 4:
        return buttonIndex ? 5 : 2;
      case 5:
        return 5;
      default:
        return state;
    }
  }

  renderHeader() {
    return (
      <Row type="flex" className={classNames(this.props.className)}>
        <Col span={24}>
          <Logo
            ref={logo => (this.logo = logo)}
            className="centered-horizontal"
            onHiddenButtonPress={this.handleHiddenButtonPress}
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
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className={classNames(this.props.className)}>
        {this.renderHeader()}
        <Router
          {...this.props}
          showLogin={this.state.showLogin}
          cancelLogin={() => this.setState({ showLogin: false })}
        />
      </div>
    );
  }
}

export default Home;
