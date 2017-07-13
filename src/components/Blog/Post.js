import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import LoadingPage from '../_global/LoadingPage';
import Prism from '../_global/Prism';

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
        return { __html: content };
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
