import React, { PureComponent } from 'react';
import { gql, graphql } from 'react-apollo';
import { Row, Col, Spin, Input, Button, message } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Comment from './Comment';
const { TextArea } = Input;

const getComments = gql`
  query getComments($postId: Int!) {
    comments(postId: $postId) {
      id
      content
      createDate
      author {
        id
        name
        avatar
      }
      subComments {
        id
        content
        createDate
        author {
          id
          name
          avatar
        }
      }
    }
  }
`;

const CreateNewComment = gql`
    mutation CreateNewComment($postId: Int, $parentId: Int, $content: String!) {
        CreateNewComment(postId: $postId, parentId: $parentId, content: $content) {
            success
        }
    }
`;

@graphql(CreateNewComment)
@graphql(getComments, {
  options: ({ postId }) => ({ variables: { postId } }),
})
class Comments extends PureComponent {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    mutate: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      comments: PropTypes.array,
      refetch: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {};

  renderComments = () => {
    const { comments } = this.props.data;

    if (_.isEmpty(comments))
      return <div className="centered-horizontal">暂时没有评论</div>;

    return comments.map(comment =>
      <Comment
        comment={comment}
        key={comment.id}
        refetch={this.props.data.refetch}
        mutate={this.props.mutate}
      />
    );
  };

  onChangeComment = e => {
    this.setState({ comment: e.target.value });
  };

  submitComment = () => {
    this.setState({ submitting: true });
    if (!this.state.comment) {
      message.error('评论不能为空', 5);
      this.setState({ submitting: false });
      return;
    }
    this.props
      .mutate({
        variables: { postId: this.props.postId, content: this.state.comment },
      })
      .then(({ data }) => {
        const { success } = data.CreateNewComment;
        this.setState({ submitting: false });
        if (success) {
          message.success('发布成功', 5);
          this.setState({ comment: undefined });
          this.props.data.refetch();
        } else {
          message.error('发布失败', 5);
        }
      })
      .catch(error => {
        console.log('create comment', error);
        this.setState({ submitting: false });
        message.error(error.message);
      });
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
        <Row><Col span={24}><h3>发表评论</h3></Col></Row>
        <Row>
          <Col span={24}>
            <TextArea
              className="comment-box"
              autosize={{ minRows: 3, maxRows: 6 }}
              onChange={this.onChangeComment}
              value={this.state.comment}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              ghost
              type="primary"
              disabled={!this.state.comment}
              onClick={this.submitComment}
              loading={this.state.submitting}
            >
              发送
            </Button>
          </Col>
        </Row>
      </footer>
    );
  };
}

export default Comments;
