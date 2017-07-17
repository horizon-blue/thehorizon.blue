import React, { PureComponent } from 'react';
import { Row, Col, Avatar, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { IMG_ROOT /*, ADMIN_GROUP_ID*/ } from '../../constants/api';

class Comment extends PureComponent {
    static propTypes = {
        comment: PropTypes.object.isRequired,
    };

    render = () => {
        const { comment: { author, createDate, content } } = this.props;
        return (
            <Row className="post-comment-card">
                <Col span={24}>
                    <div className="post-comment-meta">
                        <Avatar
                            src={
                                author.avatar
                                    ? IMG_ROOT + author.avatar
                                    : undefined
                            }
                            icon="user"
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
                </Col>
            </Row>
        );
    };
}

export default Comment;
