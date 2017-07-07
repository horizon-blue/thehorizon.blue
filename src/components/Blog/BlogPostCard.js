import React, { PureComponent } from 'react';
import { Row, Col, Tag } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/zh-cn';

import './style.css';

class BlogPostCard extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired,
    };

    state = {
        dimensions: { height: 0, top: 0 },
        windowHeight: 0,
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = ev => {
        this.setState({
            dimensions: this.article.getBoundingClientRect(),
            windowHeight: window.innerHeight,
        });
    };

    get_opacity() {
        const { dimensions: { height, top }, windowHeight } = this.state;
        const t = _.clamp(top / (height + windowHeight), 0, 1);
        return _.clamp(0.4 * Math.sin(2 * Math.PI * t) + 0.65, 0.65, 1) || 0.65;
    }

    handleClick = () => {
        const { post: { link }, history, location } = this.props;
        history.push(`${location.pathname}/${link}`);
    };

    render() {
        const {
            post: { title, excerpt, publishDate, author, tags },
        } = this.props;
        return (
            <div>
                <article
                    className="post-container"
                    ref={article => (this.article = article)}
                    style={{ opacity: this.get_opacity() }}
                    onClick={this.handleClick}
                >
                    <Row type="flex" align="bottom" justify="space-between">
                        <Col><h1>{title}</h1></Col>
                        <Col>
                            {tags.map((tag, index) =>
                                <Tag
                                    key={index}
                                    color="rgba(14, 42, 118, 0.2)"
                                    className="post-tag"
                                >
                                    {tag.name}
                                </Tag>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="post-excerpt">{excerpt}</Col>
                    </Row>
                    <Row>
                        <Col className="post-meta">
                            {author.name} 发布于{' '}
                            {moment.utc(publishDate).fromNow()}
                        </Col>
                    </Row>
                </article>
                <hr />
            </div>
        );
    }
}

export default BlogPostCard;
