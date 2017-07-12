import React, { PureComponent } from 'react';
import { Row, Col, Affix, message, Button, Radio, Select, Spin } from 'antd';
import FontAwesome from '../_global/FontAwesome';
import classNames from 'classnames';
import Editor from 'draft-js-plugins-editor';
import PropTypes from 'prop-types';
import { RichUtils, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import moment from 'moment';
import { gql, graphql } from 'react-apollo';
import 'draft-js/dist/Draft.css';
import transit from 'transit-immutable-js';
import ToolBar from './ToolBar';
import styleMap from './styleMap';
import keyboardBindingFn from './keyboardBindingFn';
import LoadingPage from '../_global/LoadingPage';
import { connect } from 'react-redux';
import './prism.css';
import { SAVE_DRAFT } from '../../store/reducer/actionTypes';
import { POST_ROOT } from '../../constants/api';

// draftjs plugins
import createCounterPlugin from 'draft-js-counter-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import prismPlugin from './prismPlugin';
const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, LineCounter } = counterPlugin;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const plugins = [prismPlugin, createMarkdownShortcutsPlugin(), counterPlugin];

const Separator = props => <span className="separator">|</span>;

function mapStateToProps(state, ownProps) {
    return {
        draft: state.draft,
        rehydrated: state.rehydrated,
    };
}

const getTagsAndCateegories = gql`
  query getTagsAndCateegories {
    tags {
        name
    }
    categories {
        name
    }
  }
`;

const initialState = {
    title: '',
    editorState: EditorState.createEmpty(),
    link: '',
    visibility: '',
    tags: [],
    category: '',
    excerpt: '',
};

@connect(mapStateToProps)
@graphql(getTagsAndCateegories)
class PostEditor extends PureComponent {
    static propTypes = {
        draft: PropTypes.any,
        rehydrated: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            tags: PropTypes.array,
            categories: PropTypes.array,
        }).isRequired,
    };

    state = {};

    componentDidMount = () => {
        this.loadDraft(this.props);
    };

    componentWillReceiveProps = nextProps => {
        this.loadDraft(nextProps);
    };

    componentWillUnmount = () => {
        clearInterval(this.autosave);
    };

    loadDraft = props => {
        if (props.rehydrated && !this.state.editorState) {
            this.setState(
                props.draft
                    ? {
                          ...initialState,
                          ...props.draft,
                          editorState: EditorState.createWithContent(
                              convertFromRaw(
                                  transit.fromJSON(props.draft.content)
                              )
                          ),
                      }
                    : initialState
            );
            this.autosave = setInterval(this.handleSave, 300000);
        }
    };

    setFocus = () => {
        this.setState({ hasFocus: true });
    };

    setBlur = () => {
        this.setState({ hasFocus: false });
    };

    onChange = editorState => this.setState({ editorState });

    renderWordCountFooter = () => {
        return <div />;
    };

    onTagChange = tags => {
        this.setState({ tags });
    };

    onExcerptChange = excerpt => {
        this.setState({ excerpt });
    };

    handleKeyCommand = command => {
        if (command === 'myeditor-save') {
            this.handleSave();
            return 'handled';
        }
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    _toggleBlockType = blockType => {
        this.onChange(
            RichUtils.toggleBlockType(this.state.editorState, blockType)
        );
    };

    _toggleInlineStyle = inlineStyle => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
    };

    onTitleChange = e => {
        this.setState({ title: e.target.value });
    };

    onLinkChange = e => {
        this.setState({ link: e.target.value });
    };

    renderWordCountFooter = () => {
        return (
            <footer className="word-count-footer">
                <CharCounter />字符<Separator />
                <WordCounter />词<Separator />
                <LineCounter />行
            </footer>
        );
    };

    focus = e => this.editor.focus();

    handleReset = () => {
        this.setState(initialState);
    };

    handleSave = () => {
        message.loading('保存草稿中...', 3);
        this.props.dispatch({
            type: SAVE_DRAFT,
            draft: {
                title: this.state.title,
                content: transit.toJSON(
                    convertToRaw(this.state.editorState.getCurrentContent())
                ),
                link: this.state.link,
                tags: this.state.tags,
                category: this.state.category,
                visibility: this.state.visibility,
            },
        });
    };

    onChangeVisibility = e => {
        this.setState({
            visibility: e.target.value,
        });
    };

    onCategoryChange = value => {
        this.setState({ category: value });
    };

    renderTags = () => {
        const { data: { tags, loading } } = this.props;
        if (loading) return null;
        return tags.map(tag =>
            <Option key={tag.name} value={tag.name}>{tag.name}</Option>
        );
    };

    render = () => {
        if (!this.state.editorState) return <LoadingPage message="载入中..." />;
        return (
            <div>
                <Row type="flex" justify="center" className="post-editor">
                    <Col sm={22} xs={24}>
                        <div className="affix-container">
                            <Affix>
                                <input
                                    type="text"
                                    className="editor-field editor-title"
                                    value={this.state.title}
                                    onChange={this.onTitleChange}
                                    placeholder="无题 | Untitled"
                                />
                                <hr />
                                <div className="toolbar-wrapper">
                                    <ToolBar
                                        toggleBlockType={this._toggleBlockType}
                                        toggleInlineStyle={
                                            this._toggleInlineStyle
                                        }
                                        editorState={this.state.editorState}
                                        additionalIcons={[
                                            {
                                                icon: 'trash',
                                                onToggle: this.handleReset,
                                            },
                                        ]}
                                    />
                                </div>
                            </Affix>
                        </div>
                        <div
                            className={classNames('editor-field', {
                                hasFocus: this.state.hasFocus,
                            })}
                            onClick={this.focus}
                        >
                            <Editor
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                                onFocus={this.setFocus}
                                onBlur={this.setBlur}
                                customStyleMap={styleMap}
                                handleKeyCommand={this.handleKeyCommand}
                                keyBindingFn={keyboardBindingFn}
                                plugins={plugins}
                                ref={editor => (this.editor = editor)}
                            />
                        </div>
                        <div className="advanced-settings">
                            <Row className="advanced-settings-entry">
                                <Col>
                                    <label>
                                        <FontAwesome name="link" /> 链接：{'  '}
                                        <span className="post-link">
                                            {POST_ROOT +
                                                moment(new Date()).format(
                                                    'YYYY-MM-DD'
                                                )}/
                                            <input
                                                type="text"
                                                className="editor-field"
                                                value={this.state.link}
                                                onChange={this.onLinkChange}
                                                placeholder={this.state.title}
                                            />
                                        </span>
                                    </label>
                                </Col>
                            </Row>
                            <Row className="advanced-settings-entry">
                                <Col>
                                    <label>
                                        <FontAwesome name="tags" /> 标签：{'  '}
                                        {!this.props.data.loading &&
                                            <Select
                                                mode="tags"
                                                tokenSeparators={[',']}
                                                className="editor-field editor-tags"
                                                value={this.state.tags}
                                                size="small"
                                                onChange={this.onTagChange}
                                                filterOption={false}
                                            >
                                                {this.renderTags()}
                                            </Select>}
                                    </label>
                                </Col>
                            </Row>
                            <Row className="advanced-settings-entry">
                                <Col>
                                    <label>
                                        <FontAwesome name="puzzle-piece" /> 分类：{'  '}
                                        {!this.props.data.loading &&
                                            <Select
                                                className="editor-field editor-tags editor-category"
                                                value={this.state.category}
                                                size="small"
                                                onChange={this.onCategoryChange}
                                                notFoundContent={
                                                    this.props.data.loading
                                                        ? <Spin size="small" />
                                                        : null
                                                }
                                                filterOption={false}
                                            >
                                                {this.renderTags()}
                                            </Select>}
                                    </label>
                                </Col>
                            </Row>
                            <Row className="advanced-settings-entry">
                                <Col>
                                    <label>
                                        <FontAwesome name="eye" /> 权限：{'  '}
                                        <RadioGroup
                                            onChange={this.onChangeVisibility}
                                            value={this.state.visibility}
                                        >
                                            <Radio value={1}>公开</Radio>
                                            <Radio value={2}>半公开</Radio>
                                            <Radio value={3}>仅自己可见</Radio>
                                        </RadioGroup>
                                    </label>
                                </Col>
                            </Row>
                            <Row className="advanced-settings-entry">
                                <Col>
                                    <label>
                                        <FontAwesome name="bars" /> 简介：{'  '}
                                        <input
                                            type="text"
                                            className="editor-field editor-excerpt"
                                            value={this.state.excerpt}
                                            onChange={this.onExcerptChange}
                                            placeholder="---"
                                        />
                                    </label>
                                </Col>
                            </Row>
                        </div>
                        <Row type="flex" justify="center">
                            <Col>
                                <Button ghost type="primary">
                                    发布
                                </Button>
                                <a className="save-as-draft">
                                    保存为草稿
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {this.renderWordCountFooter()}
            </div>
        );
    };
}

export default PostEditor;
