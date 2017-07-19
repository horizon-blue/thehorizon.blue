import React, { PureComponent } from 'react';
import { Row, Col, Avatar, Tooltip, Input, Button, message } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import 'moment/locale/zh-cn';
import { IMG_ROOT } from '../../constants/api';
const { TextArea } = Input;

class Comment extends PureComponent {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        isSub: PropTypes.bool,
        mutate: PropTypes.func.isRequired,
        refetch: PropTypes.func.isRequired,
        openCommentBox: PropTypes.func,
        closeCommentBox: PropTypes.func,
    };

    state = { showCommentBox: false };

    createComment = e => {
        e.preventDefault();
        if (this.props.openCommentBox) {
            // in sub comment now
            this.props.openCommentBox(
                '@' + this.props.comment.author.name + ' : '
            );
        } else {
            this.openCommentBox('');
        }
    };

    openCommentBox = initialValue => {
        this.setState({
            showCommentBox: true,
            comment: initialValue,
        });
    };

    onChangeComment = e => {
        this.setState({ comment: e.target.value });
    };

    closeCommentBox = () => {
        this.setState({ showCommentBox: false });
    };

    cancelComment = e => {
        e.preventDefault();
        if (this.props.closeCommentBox) {
            // in sub comment now
            this.props.closeCommentBox();
        } else {
            this.closeCommentBox();
        }
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
                variables: {
                    parentId: this.props.comment.id,
                    content: this.state.comment,
                },
            })
            .then(({ data }) => {
                const { success } = data.CreateNewComment;
                this.setState({ submitting: false });
                if (success) {
                    message.success('发布成功', 5);
                    this.setState({
                        comment: undefined,
                        showCommentBox: false,
                    });
                    this.props.refetch();
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

    renderCommentBox = () => {
        if (this.props.isSub) return null;
        return (
            <div className="post-comment-card">
                <TextArea
                    className="comment-box "
                    autosize={{ minRows: 2, maxRows: 4 }}
                    onChange={this.onChangeComment}
                    value={this.state.comment}
                />
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
                        <a
                            style={{ marginLeft: 10 }}
                            onClick={this.cancelComment}
                        >
                            取消
                        </a>
                    </Col>
                </Row>
            </div>
        );
    };

    render = () => {
        const {
            comment: { author, createDate, content, subComments },
            isSub,
            refetch,
            mutate,
        } = this.props;

        return (
            <Row
                className={classNames('post-comment-card', {
                    hasSub: !_.isEmpty(subComments),
                })}
            >
                <Col span={24}>
                    <Row type="flex" align="middle" justify="space-between">
                        <Col>
                            <div
                                className={classNames('post-comment-meta', {
                                    isSub,
                                })}
                            >
                                <Avatar
                                    src={
                                        author.avatar
                                            ? IMG_ROOT + author.avatar
                                            : undefined
                                    }
                                    icon="user"
                                    size={isSub ? 'small' : 'default'}
                                />
                                <span className="post-comment-author-name">
                                    {author.name}
                                </span>
                                <Tooltip
                                    title={moment
                                        .utc(createDate)
                                        .local()
                                        .format('LLL')}
                                >
                                    <span className="post-comment-created-date">
                                        {moment.utc(createDate).fromNow()}
                                    </span>
                                </Tooltip>
                            </div>
                        </Col>
                        <Col><a onClick={this.createComment}>回复</a></Col>
                    </Row>
                    <div className="post-comment-content">{content}</div>
                    {subComments &&
                        subComments.map(comment =>
                            <Comment
                                comment={comment}
                                key={comment.id}
                                isSub={true}
                                refetch={refetch}
                                mutate={mutate}
                                openCommentBox={this.openCommentBox}
                            />
                        )}
                    {this.state.showCommentBox && this.renderCommentBox()}
                </Col>
            </Row>
        );
    };
}

export default Comment;
