import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Route, Switch } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import Content from '../_global/Content';
import BlogPostCard from './BlogPostCard';
import Post from './Post';
import FadeView from '../_global/FadeView';

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
      tags {
        name
      }
    }
  }
`;

@graphql(getAllPosts)
class Blog extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      posts: PropTypes.array,
    }).isRequired,
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

  renderPosts = () => {
    const { data: { posts, loading }, history, location } = this.props;
    return (
      <FadeView in={!loading && _.isArray(posts)} className="fade">
        {loading || !posts
          ? <div />
          : <div>
              {posts.map(post =>
                <BlogPostCard
                  post={post}
                  key={post.link}
                  history={history}
                  location={location}
                />
              )}
            </div>}
      </FadeView>
    );
  };

  renderFooter() {
    return <div style={{ height: '20vh' }} />;
  }

  render() {
    const { className, data: { loading } } = this.props;
    return (
      <Content
        className={classnames('Blog', className)}
        title={Blog.routeConfig.title}
      >
        {loading &&
          <div className="centered-horizontal">
            <Spin tip="加载中..." size="large" />
          </div>}
        <Switch>
          <Route path="/blog" exact render={this.renderPosts} />
          <Route path="/blog/:postLink" component={Post} />
        </Switch>
        <footer>
          {this.renderFooter()}
        </footer>
      </Content>
    );
  }
}

export default Blog;
