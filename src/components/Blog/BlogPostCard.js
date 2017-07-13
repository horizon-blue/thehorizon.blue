import React, { PureComponent } from 'react';
import { Row, Col, Tag } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import Prism from '../_global/Prism';
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

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
        this.highlight();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.post === prevProps.post) return;
        this.highlight();
    };

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    };

    highlight = () => {
        if (!this.excerpt) return;
        let code = this.excerpt.getElementsByTagName('code');
        for (let c of code) {
            Prism.highlightElement(c);
        }
    };

    createExceprt = excerpt => {
        return { __html: excerpt };
    };

    handleScroll = ev => {
        this.setState({
            dimensions: this.article.getBoundingClientRect(),
            windowHeight: window.innerHeight,
        });
    };

    get_opacity() {
        const { dimensions: { height, top }, windowHeight } = this.state;
        const t = _.clamp(top / (windowHeight - height), 0, 1);
        return _.clamp(Math.sin(Math.PI * t) * 1.2, 0.2, 1) || 0.5;
    }

    handleClick = () => {
        const { post: { link, category }, history, location } = this.props;
        history.push(`${location.pathname}/${category.name}/${link}`);
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
                        <Col className="post-excerpt">
                            <div
                                ref={excerpt => (this.excerpt = excerpt)}
                                dangerouslySetInnerHTML={this.createExceprt(
                                    excerpt
                                )}
                            />
                        </Col>
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
