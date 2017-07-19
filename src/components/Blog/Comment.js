import React, { PureComponent } from 'react';
import { Row, Col, Avatar, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import 'moment/locale/zh-cn';
import { IMG_ROOT } from '../../constants/api';

class Comment extends PureComponent {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        isSub: PropTypes.bool,
    };

    render = () => {
        const {
            comment: { author, createDate, content, subComments },
            isSub,
        } = this.props;
        return (
            <Row
                className={classNames('post-comment-card', {
                    hasSub: !_.isEmpty(subComments),
                })}
            >
                <Col span={24}>
                    <div className={classNames('post-comment-meta', { isSub })}>
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
                        <Tooltip title={moment.utc(createDate).format('LLL')}>
                            <span className="post-comment-created-date">
                                {moment.utc(createDate).fromNow()}
                            </span>
                        </Tooltip>
                    </div>
                    <div className="post-comment-content">{content}</div>
                    {subComments &&
                        subComments.map(comment =>
                            <Comment
                                comment={comment}
                                key={comment.id}
                                isSub={true}
                            />
                        )}
                </Col>
            </Row>
        );
    };
}

export default Comment;
