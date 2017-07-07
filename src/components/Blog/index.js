import React, { Component } from 'react';
import classnames from 'classnames';
import { Spin, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Content from '../_global/Content';

import './style.css';

const getAllPosts = gql`
  query getAllPosts {
    posts {
      title
      publishDate
      title
      excerpt
      author {
        name
      }
    }
  }
`;

@graphql(getAllPosts)
class Blog extends Component {
  renderPosts() {
    const { data: { posts } } = this.props;
    return posts.map((post, index) => this.renderPost(post, index));
  }

  renderPost(post, index) {
    const { title, excerpt, publishDate, author } = post;
    return (
      <div>
        <article key={index} className="post-container">
          <Row><h1>{title}</h1></Row>
          <Row>{excerpt.repeat(80)}</Row>
          <Row>{author.name} 发布于 {moment.utc(publishDate).fromNow()}</Row>
        </article>
        <article key={index + 1} className="post-container">
          <Row><h1>{title}</h1></Row>
          <Row>{excerpt.repeat(80)}</Row>
          <Row>{author.name} 发布于 {moment.utc(publishDate).fromNow()}</Row>
        </article>
      </div>
    );
  }
  render() {
    const { className, data: { loading, posts } } = this.props;
    return (
      <Content
        className={classnames('Blog', className)}
        title={Blog.routeConfig.title}
      >
        <div className="centered-horizontal">
          <Spin spinning={loading} tip="加载中..." size="large" />
        </div>
        {!loading && posts && this.renderPosts()}
      </Content>
    );
  }

  static get routeConfig() {
    return {
      title: '记忆碎片',
      typingStrings: [
        '这里存放的，^1000大概是一些没有什么逻辑关联的杂思乱想。^1000<br />随意看看便好，不必当真。',
        ':)',
      ],
    };
  }

  static get propTypes() {
    return {
      data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        posts: PropTypes.array,
      }).isRequired,
    };
  }
}

export default Blog;
