import React, { PureComponent } from 'react';
import { gql, graphql } from 'react-apollo';
import { Row, Col, Spin } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Comment from './Comment';

const getComments = gql`
  query getComments($postId: Int) {
    comments(postId: $postId) {
      id
      content
      createDate
      author {
      	id
      	name
      	avatar
      	group {
      	  id
      	}
      }
      subComments {
      	id
        content
        createDate
        author {
          id
          name
          group {
          	id
          }
        }
      }
    }
  }
`;

@graphql(getComments, {
    options: ({ postId }) => ({ variables: { postId } }),
})
class Comments extends PureComponent {
    static propTypes = {
        postId: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            comments: PropTypes.array,
            refetch: PropTypes.func.isRequired,
        }).isRequired,
    };

    renderComments = () => {
        const { comments } = this.props.data;

        if (_.isEmpty(comments))
            return <div className="centered-horizontal">暂时没有评论</div>;

        return comments.map(comment =>
            <Comment comment={comment} key={comment.id} />
        );
    };
    render = () => {
        return (
            <footer className="post-comments-container">
                <Row><Col span={24}><h2>评论</h2></Col></Row>
                {this.props.data.loading
                    ? <div className="centered-horizontal">
                          <Spin tip="加载中..." size="large" />
                      </div>
                    : this.renderComments()}
            </footer>
        );
    };
}

export default Comments;
