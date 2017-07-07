import React, { Component } from 'react';
import classnames from 'classnames';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import Content from '../_global/Content';
import BlogPostCard from './BlogPostCard';

const getAllPosts = gql`
  query getAllPosts {
    posts {
      title
      link
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
    return [
      <BlogPostCard post={posts[0]} key="a" />,
      <BlogPostCard post={posts[0]} key="b" />,
      <BlogPostCard post={posts[0]} key="c" />,
      <BlogPostCard post={posts[0]} key="d" />,
      <BlogPostCard post={posts[0]} key="e" />,
      <BlogPostCard post={posts[0]} key="f" />,
    ];
    // return posts.map(post => <BlogPostCard post={post} key={post.link} />);
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
