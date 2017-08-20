import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import Content from '@_global/Content';
import BlogPostCard from './BlogPostCard';
import Post from './Post';
import FadeView from '@_global/FadeView';
import MutationEditor from '@PostEditor/MutationEditor';

const getAllPosts = gql`
  query getAllPosts {
    posts {
      id
      title
      link
      publishDate
      title
      excerpt
      visibility {
        id
        name
      }
      author {
        id
        name
      }
      tags {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
`;

@connect()
@graphql(getAllPosts)
class BlogHome extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      posts: PropTypes.array,
      refetch: PropTypes.func.isRequired,
    }).isRequired,
    className: PropTypes.string,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  updatePost = () => {
    this.props.data.refetch();
  };

  render = () => {
    const { data: { posts, loading }, history, location } = this.props;
    if (loading)
      return (
        <div className="centered-horizontal">
          <Spin tip="加载中..." size="large" />
        </div>
      );
    return (
      <FadeView in={!loading && _.isArray(posts)} className="fade">
        {loading || !posts
          ? <div />
          : <div>
              {posts.map(post =>
                <BlogPostCard
                  post={post}
                  key={post.publishDate + post.link}
                  history={history}
                  location={location}
                />
              )}
            </div>}
      </FadeView>
    );
  };

  // blogInfoUpdate = () => {
  //   this.props.data.refetch();
  // };
}

class Blog extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    className: PropTypes.string,
  };

  static routeConfig = {
    title: '记忆碎片',
    typingStrings: [
      '这里存放的，^1000大概是一些没有什么逻辑关联的杂思乱想。^1000<br />随意看看便好，不必当真。',
      ':)',
    ],
  };

  render = () => {
    const { className } = this.props;
    return (
      <Content
        className={classnames('Blog', className)}
        title={Blog.routeConfig.title}
      >
        <Switch>
          <Route path="/blog" exact component={BlogHome} />
          <Route path="/blog/:category/:link" exact component={Post} />
          <Route path="/blog/:category/:link/edit" component={MutationEditor} />
        </Switch>
      </Content>
    );
  };
}

export default Blog;
