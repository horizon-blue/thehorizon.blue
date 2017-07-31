import React, { PureComponent } from 'react';
import PostEditor from './index';
import { Redirect } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import LoadingPage from 'components/_global/LoadingPage';
import PropTypes from 'prop-types';

// A HOC (sort of ?) of post editor that is in charged
// of fetching and recovering data from existed
// post

const getPostInfo = gql`
  query getPostInfo($link: String!, $category: String!) {
    post(link: $link, category: $category) {
      id
      title
      content
      excerpt
      author {
        id
      }
      tags {
      	id
        name
      }
      visibility {
        id
      }
    }
  }
`;

@graphql(getPostInfo, {
    options: ({ match }) => ({ variables: { ...match.params } }),
})
class MutationEditor extends PureComponent {
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
        if (this.props.data.loading || !this.props.location.state) return;
        return (
            this.props.location.state.userId === this.props.data.post.author.id
        );
    };

    render = () => {
        const {
            data: { loading, post },
            match: { params },
            history,
            location,
        } = this.props;
        if (loading) return <LoadingPage />;

        if (!this.isAuthor())
            return <Redirect to={`/blog/${params.category}/${params.link}`} />;

        // convert the post info to editor-redable state
        const postState = {
            id: post.id,
            title: post.title,
            content: post.content,
            link: params.link,
            visibility: parseInt(post.visibility.id),
            category: params.category,
            tags: post.tags.map(tag => tag.name),
            excerpt: post.excerpt,
        };

        return (
            <PostEditor
                history={history}
                location={location}
                editContent={postState}
            />
        );
    };
}

export default MutationEditor;
