import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import LoadingPage from '../_global/LoadingPage';
import Prism from '../_global/Prism';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import Helmet from 'react-helmet';

const getPostInfo = gql`
  query getPostInfo($link: String!, $category: String!) {
    post(link: $link, category: $category) {
      title
      publishDate
      content
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

      return {
        element: 'img',
        attributes: {
          src: data.src,
          alt: data.alt,
        },
        style: {
          maxWidth: '100%',
        },
      };
    }
  },
  blockRenderers,
};

@graphql(getPostInfo, {
  options: ({ match }) => ({ variables: { ...match.params } }),
})
class Post extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      post: PropTypes.object,
    }).isRequired,
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
        <h1 className="centered-horizontal post-title">
          {post.title}
        </h1>
        <div
          ref={content => (this.content = content)}
          dangerouslySetInnerHTML={this.createContent(post.content)}
        />
      </div>
    );
  }
}

export default Post;
