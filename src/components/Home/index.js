import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { bind as Mousetrap } from 'mousetrap';
import { Row, Col } from 'antd';
import Typist from 'react-typist';

@graphql(gql`query { test }`)
class Home extends Component {
  componentWillMount() {
    // The special hotkeys to enter the main website
    Mousetrap('up down left right up down left right', () =>
      this.props.history.push('/about')
    );
  }

  render() {
    const { data: { test } } = this.props;
    return (
      <Row align="middle" justify="center" type="flex">
        <Col span={6} style={{ color: 'white' }}>
          <Typist>
            Hi.
            Animate this text.
          </Typist>
        </Col>
      </Row>
    );
  }
}

export default Home;
