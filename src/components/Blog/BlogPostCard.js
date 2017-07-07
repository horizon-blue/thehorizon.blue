import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/zh-cn';

import './style.css';

class BlogPostCard extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            dimensions: { height: 0, top: 0 },
            windowHeight: 0,
        };
    }
    handleScroll(ev) {
        this.setState({
            dimensions: this.article.getBoundingClientRect(),
            windowHeight: window.innerHeight,
        });
    }

    get_opacity() {
        const { dimensions: { height, top }, windowHeight } = this.state;
        const t = _.clamp(top / (height + windowHeight), 0, 1);
        return 0.35 * Math.sin(2 * Math.PI * t) + 0.65 || 0.65;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        const { title, excerpt, publishDate, author } = this.props.post;
        const tags = ['假装', '我有标', '签'];
        return (
            <article
                className="post-container"
                ref={article => (this.article = article)}
                style={{ opacity: this.get_opacity() }}
            >
                <Row><h1>{title}</h1></Row>
                <Row>
                    <Col className="post-excerpt">{excerpt.repeat(80)}</Col>
                </Row>
                <Row>{author.name} 发布于 {moment.utc(publishDate).fromNow()}</Row>
            </article>
        );
    }
}

export default BlogPostCard;
