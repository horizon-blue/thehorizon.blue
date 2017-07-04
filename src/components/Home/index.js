import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { bind as Mousetrap } from 'mousetrap';
import { Row, Col } from 'antd';
import Typist from 'react-typist';
import PropTypes from 'prop-types';
import Login from '../Login';

@graphql(gql`query { test, context }`)
class Home extends Component {
  static get propTypes() {
    return {
      data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        test: PropTypes.string,
      }).isRequired,
    };
  }

  componentWillMount() {
    // The special hotkeys to enter the main website
    Mousetrap('up down left right up down left right', () =>
      this.props.history.push('/about')
    );
  }

  render() {
    const { data: { test, context } } = this.props;
    return (
      <Row align="middle" justify="center" type="flex">
        <Col span={6}>
          <Row>
            <Typist>
              Hi. Animate this text.
            </Typist>
          </Row>
          <Row>
            <Typist>
              How are you today?
            </Typist>
          </Row>
          <Row>
            {test}
          </Row>
          <Row><Login /></Row>
        </Col>
      </Row>
    );
  }
}

export default Home;
