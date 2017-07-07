import React, { Component } from 'react';
import { bind as Mousetrap } from 'mousetrap';
import { Row, Col } from 'antd';
import anime from 'animejs';
import Typed from 'typed.js';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { TransitionGroup } from 'react-transition-group';
import FadeView from '../_global/FadeView';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Router from './Router';
import Nav from '../Nav';
import Logo from '../_global/Logo';
import './style.css';

function mapStateToProps(state, ownProps) {
  return {
    title: state.routeConfig.title,
    typingStrings: state.routeConfig.typingStrings,
  };
}

@withRouter
@connect(mapStateToProps)
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 0,
      showNav: false,
    };
    this.handleHiddenButtonPress = this.handleHiddenButtonPress.bind(this);
  }

  componentWillMount() {
    // The special hotkeys to enter the main website
    Mousetrap('left right right left', () =>
      this.setState({ showNav: !this.state.showNav })
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
        letterSpacing: [1, 9],
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
            strings: this.props.typingStrings,
            autoInsertCss: false,
            typeSpeed: 80,
            backSpeed: 50,
            startDelay: 1000,
            backDelay: 1000,
          });
        },
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.typingStrings !== this.props.typingStrings && this.typing) {
      this.typing.destroy();
      this.typing = new Typed(this.logo.typed, {
        strings: nextProps.typingStrings,
        autoInsertCss: false,
        typeSpeed: 80,
        backSpeed: 50,
        startDelay: 1000,
        backDelay: 1000,
      });
    }
  }

  handleHiddenButtonPress(buttonIndex) {
    const buttonState = this.findNextButtonState(
      this.state.buttonState,
      buttonIndex
    );
    if (buttonState === 5)
      this.setState({ showNav: !this.state.showNav, buttonState: 0 });
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
          <div className="centered-horizontal" style={{ position: 'relative' }}>
            <TransitionGroup>
              <FadeView key={this.props.location.key}>
                <h1
                  ref={title => (this.title = title)}
                  style={{
                    letterSpacing: 9,
                    marginTop: '3vh',
                    marginBottom: '3vh',
                    fontFamily: 'consolas',
                    wordBreak: 'break-all',
                    color: '#4b84f4',
                    textAlign: 'center',
                  }}
                >
                  {this.props.title}
                </h1>
              </FadeView>
            </TransitionGroup>
          </div>
        </Col>
      </Row>
    );
  }

  renderNav() {
    return (
      <FadeView in={this.state.showNav}>
        <Nav
          key="NavPanel"
          cancelLogin={() => this.setState({ showNav: false })}
          history={this.props.history}
          location={this.props.location}
        />
      </FadeView>
    );
  }

  render() {
    const { className, ...rest } = this.props;

    return (
      <div className={classNames(className)}>
        <header>
          {this.renderHeader()}
        </header>
        <nav style={{ position: 'relative' }}>
          {this.renderNav()}
        </nav>
        <main>
          <Router {...rest} />
        </main>
      </div>
    );
  }

  static get defaultProps() {
    return {
      title: (
        <span>
          天际蓝
          <MediaQuery minDeviceWidth={768}>
            {match => (match ? <span> | </span> : <br />)}
          </MediaQuery>
          thehorizon.blue
        </span>
      ),
      typingStrings: ['这里是', '欢迎来到天空的尽头。^1000<br />无畏的勇者啊^1000，祝你旅途愉快。'],
    };
  }
}

export default Home;
