import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import LoadingPage from '../_global/LoadingPage';
import Prism from '../_global/Prism';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

const getPostInfo = gql`
  query getPostInfo($link: String!, $category: String!) {
    post(link: $link, category: $category) {
      title
      publishDate
      content
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

const blockRenderers = {};
blockRenderers['code-block'] = block => {
  const language = block.getData().get('language');
  if (typeof Prism.languages[language] === 'object')
    return `<pre class="line-numbers"><code class="language-${language}">${block.getText()}</code></pre>`;
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
        },
        style: {
          // put styles here...
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

  componentDidMount = () => {
    this.highlight();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.data.post === prevProps.data.post) return;
    this.highlight();
  };

  createContent = content => {
    if (!content) return;
    const parsedContent = stateToHTML(
      convertFromRaw(JSON.parse(content)),
      exportHTMLOptions
    );
    return { __html: parsedContent };
  };

  highlight = () => {
    if (!this.content) return;
    let code = this.content.getElementsByTagName('code');
    for (let c of code) {
      Prism.highlightElement(c);
    }
  };

  render() {
    const { data: { loading, post } } = this.props;
    if (loading) return <LoadingPage />;
    return (
      <div>
        <div
          ref={content => (this.content = content)}
          dangerouslySetInnerHTML={this.createContent(post.content)}
        />
      </div>
    );
  }
}

export default Post;
