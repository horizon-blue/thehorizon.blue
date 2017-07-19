import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { Redirect, Link } from 'react-router-dom';
import LoadingPage from '../_global/LoadingPage';
import Prism from '../_global/Prism';
import FontAwesome from '../_global/FontAwesome';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { IMG_ROOT } from '../../constants/api';
import Loadable from 'react-loadable';
import Loading from '../_global/Loading';
import _ from 'lodash';
import 'moment/locale/zh-cn';

const LoadableComments = Loadable({
  loader: () => import(/* webpackChunkName: "Comments" */ `./Comments`),
  loading: Loading,
});

const getPostInfo = gql`
  query getPostInfo($link: String!, $category: String!) {
    post(link: $link, category: $category) {
      title
      id
      publishDate
      content
      excerpt
      author {
        name
        id
      }
      tags {
        id
        name
      }
    }
  }
`;

const blockRenderers = {};
blockRenderers['code-block'] = block => {
  const language = block.getData().get('language');
  const languageObj = Prism.languages[language];
  if (typeof languageObj === 'object') {
    const renderedCode = Prism.highlight(block.getText(), languageObj);
    return `<pre><code>${renderedCode}</code></pre>`;
  }
};

const exportHTMLOptions = {
  entityStyleFn: entity => {
    const entityType = entity.get('type').toLowerCase();

    if (entityType === 'img') {
      const data = entity.getData();

      let { alt, src } = data;
      // check for my custom markdown notation
      if (alt[0] === '*') {
        alt = alt.substr(1);
        src = IMG_ROOT + src;
      }

      return {
        element: 'img',
        attributes: {
          src: src,
          alt: alt,
          title: data.title,
        },
        style: {
          maxWidth: '100%',
        },
      };
    }
  },
  blockRenderers,
};

function mapStateToProps(state, ownProps) {
  return {
    token: state.token,
  };
}

@connect(mapStateToProps)
@graphql(getPostInfo, {
  options: ({ match }) => ({ variables: { ...match.params } }),
})
class Post extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    token: PropTypes.string,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      post: PropTypes.object,
    }).isRequired,
  };

  isAuthor = () => {
    if (this.props.data.loading) return;
    // avoid decoding for multiple times
    if (_.isUndefined(this.userId)) {
      const { token } = this.props;
      if (!token) return;
      const info = jwtDecode(token);
      if (!info || _.isUndefined(info.sub)) return;
      this.userId = info.sub.toString();
    }
    return this.userId === this.props.data.post.author.id;
  };

  createContent = content => {
    if (!content) return;
    const parsedContent = stateToHTML(
      convertFromRaw(JSON.parse(content)),
      exportHTMLOptions
    );
    return { __html: parsedContent };
  };

  render() {
    const { data: { loading, post } } = this.props;
    if (loading) return <LoadingPage />;
    if (!loading && !post) return <Redirect to="/404" />; // post does not exist
    return (
      <div>
        <Helmet>
          <title>{post.title} | 天际蓝 - thehorizon.blue</title>
          <meta name="description" content={post.excerpt} />
        </Helmet>
        <article>
          <header className="centered-horizontal post-title">
            <h1>
              {post.title}
            </h1>
            <div>
              <span><FontAwesome name="user" />{' ' + post.author.name}</span>
              <span>
                <FontAwesome name="calendar" />
                {' ' + moment.utc(post.publishDate).local().format('l')}
              </span>
              {this.isAuthor() &&
                <Link
                  to={{
                    pathname: this.props.location.pathname + '/edit',
                    state: { userId: this.userId },
                  }}
                >
                  <FontAwesome name="pencil-square-o" />
                  编辑
                </Link>}
            </div>
          </header>
          <main
            ref={content => (this.content = content)}
            dangerouslySetInnerHTML={this.createContent(post.content)}
            className="post-article-content"
          />
        </article>
        <hr />
        <LoadableComments postId={post.id} />
      </div>
    );
  }
}

export default Post;
