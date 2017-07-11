import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Content from './Content';

class Loading extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    timedOut: PropTypes.bool,
    pastDelay: PropTypes.bool,
    error: PropTypes.bool,
  };

  renderContent() {
    const { isLoading, error, timedOut, pastDelay } = this.props;

    if (isLoading) {
      // While our other component is loading...
      if (timedOut) {
        // In case we've timed out loading our other component.
        return <div>加载超时:(</div>;
      } else if (pastDelay) {
        // Display a loading screen after a set delay.
        return <Spin tip="加载中..." size="large" />;
      } else {
        // Don't flash "Loading..." when we don't need to.
        return null;
      }
    } else if (error) {
      // If we aren't loading, maybe
      return <div>加载失败:(</div>;
    } else {
      // This case shouldn't happen... but we'll return null anyways.
      return null;
    }
  }
  render = () => {
    return (
      <Content title="加载中...">
        <Row type="flex" justify="center">
          <Col>
            {this.renderContent()}
          </Col>
        </Row>
      </Content>
    );
  };
}

export default Loading;
