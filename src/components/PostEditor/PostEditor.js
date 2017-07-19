import React, { PureComponent } from 'react';
import { Row, Col, Affix, message, Button, Radio, Select, Spin } from 'antd';
import { Prompt } from 'react-router-dom';
import FontAwesome from '../_global/FontAwesome';
import classNames from 'classnames';
import Editor from 'draft-js-plugins-editor';
import PropTypes from 'prop-types';
import { RichUtils, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { gql, graphql } from 'react-apollo';
import 'draft-js/dist/Draft.css';
import ToolBar from './ToolBar';
import styleMap from './styleMap';
import keyboardBindingFn from './keyboardBindingFn';
import LoadingPage from '../_global/LoadingPage';
import { connect } from 'react-redux';
import { SAVE_DRAFT, UPDATE_POST } from '../../store/reducer/actionTypes';
import { POST_ROOT, DRAFT_VISIBILITY_ID } from '../../constants/api';

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

const initialState = {
    title: '',
    editorState: EditorState.createEmpty(),
    link: '',
    visibility: 1,
    tags: [],
    category: 'trifles',
    excerpt: '',
};

const getTagsAndCateegories = gql`
  query getTagsAndCateegories {
    tags {
        id
        name
    }
    categories {
        id
        name
    }
  }
`;

const CreateNewPost = gql`
    mutation CreateNewPost($title: String!, $content: String!, $link: String, $tags: [String], $category: String!, $visibilityId: Int!, $excerpt: String!) {
        CreateNewPost(title: $title, content: $content, link: $link, tags: $tags, category: $category, visibilityId: $visibilityId, excerpt: $excerpt) {
            success
            link
        }
    }
`;

const UpdatePostInfo = gql`
    mutation UpdatePostInfo($postId: Int!, $title: String!, $content: String!, $link: String, $tags: [String], $category: String!, $visibilityId: Int!, $excerpt: String!) {
        UpdatePostInfo(postId: $postId, title: $title, content: $content, link: $link, tags: $tags, category: $category, visibilityId: $visibilityId, excerpt: $excerpt) {
            success
            link
        }
    }
`;

@graphql(CreateNewPost, { name: 'CreateNewPostMutation' })
@graphql(UpdatePostInfo, { name: 'UpdatePostInfoMutation' })
@connect(mapStateToProps)
@graphql(getTagsAndCateegories)
class PostEditor extends PureComponent {
    static propTypes = {
        draft: PropTypes.any,
        rehydrated: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        CreateNewPostMutation: PropTypes.func.isRequired,
        UpdatePostInfoMutation: PropTypes.func.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            tags: PropTypes.array,
            categories: PropTypes.array,
        }).isRequired,
        editContent: PropTypes.object,
    };

    state = {};

    componentDidMount = () => {
        window.addEventListener('beforeunload', this.onUnload);

        if (this.props.editContent) this.loadDraft(this.props.editContent);
        else if (this.props.rehydrated) this.loadDraft(this.props.draft);
    };

    componentWillReceiveProps = nextProps => {
        if (
            !nextProps.editContent &&
            nextProps.rehydrated &&
            !this.state.editorState
        )
            this.loadDraft(nextProps.draft);
    };

    componentWillUnmount = () => {
        clearInterval(this.autosave);
        window.removeEventListener('beforeunload', this.onUnload);
    };

    onUnload = event => {
        this.handleSave();
    };

    loadDraft = draft => {
        this.setState(
            draft
                ? {
                      ...initialState,
                      ...draft,
                      editorState: draft.content
                          ? EditorState.createWithContent(
                                convertFromRaw(JSON.parse(draft.content))
                            )
                          : initialState.editorState,
                  }
                : initialState
        );
        this.autosave = setInterval(this.handleSave, 300000);
    };

    setFocus = () => {
        this.setState({ hasFocus: true });
    };

    setBlur = () => {
        this.setState({ hasFocus: false });
    };

    onChange = editorState => this.setState({ editorState });

    onTagChange = tags => {
        this.setState({ tags });
    };

    onExcerptChange = excerpt => {
        this.setState({ excerpt: excerpt.target.value });
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
                content: JSON.stringify(
                    convertToRaw(this.state.editorState.getCurrentContent())
                ),
                link: this.state.link,
                tags: this.state.tags,
                category: this.state.category,
                visibility: this.state.visibility,
                excerpt: this.state.excerpt,
            },
        });
    };

    removeDraft = () => {
        this.props.dispatch({
            type: SAVE_DRAFT,
            draft: null,
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

    renderCategories = () => {
        const { data: { categories, loading } } = this.props;
        if (loading) return null;
        return categories.map(category =>
            <Option key={category.name} value={category.name}>
                {category.name}
            </Option>
        );
    };

    handleUpload = (draft = false) => {
        // finally!! upload the post
        // const parsedContent = stateToHTML(
        //     this.state.editorState.getCurrentContent(),
        //     exportHTMLOptions
        // );

        const parsedContent = JSON.stringify(
            convertToRaw(this.state.editorState.getCurrentContent())
        );

        if (!this.state.title || !parsedContent || !this.state.category) {
            message.error('标题，内容，分类不能为空', 5);
            return;
        }

        this.setState({ uploading: true });

        const {
            history,
            UpdatePostInfoMutation,
            CreateNewPostMutation,
        } = this.props;

        const mutate = this.props.editContent
            ? UpdatePostInfoMutation
            : CreateNewPostMutation;

        mutate({
            variables: this.stateToSubmitInfo(draft, parsedContent),
        })
            .then(({ data }) => {
                const { success, link } = this.props.editContent
                    ? data.UpdatePostInfo
                    : data.CreateNewPost;
                success ? message.success('发布成功', 5) : message.error('发布失败', 5);
                this.setState({ uploading: false });
                if (success) {
                    // clear the draft
                    this.removeDraft();
                    this.props.dispatch({
                        type: UPDATE_POST,
                    });
                    history.push(`/blog/${this.state.category}/${link}`);
                }
            })
            .catch(error => {
                console.log('upload post', error);
                this.setState({ uploading: false });
                message.error(error.message);
            });
    };

    stateToSubmitInfo = (draft, parsedContent) => {
        let excerpt = this.state.excerpt;
        if (!excerpt) {
            const content = this.state.editorState
                .getCurrentContent()
                .getPlainText();
            if (content.length > 160) excerpt = content.substr(0, 160) + '...';
            else excerpt = content;
        }
        const addtional = this.props.editContent
            ? { postId: this.props.editContent.id }
            : {};
        return {
            title: this.state.title,
            content: parsedContent,
            link: this.state.link,
            visibilityId: draft ? DRAFT_VISIBILITY_ID : this.state.visibility,
            category: this.state.category,
            tags: this.state.tags,
            excerpt,
            ...addtional,
        };
    };

    handleDraft = e => {
        e.preventDefault();
        this.handleUpload(true);
    };

    handleSubmit = () => {
        this.handleUpload();
    };

    render = () => {
        if (!this.state.editorState) return <LoadingPage message="载入中..." />;
        return (
            <div>
                <Prompt message="确定要离开吗？" />
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
                                            {POST_ROOT + this.state.category + '/'}
                                            <input
                                                type="text"
                                                className="editor-field"
                                                value={this.state.link}
                                                onChange={this.onLinkChange}
                                                placeholder={this.state.title.replace(
                                                    /\s+/g,
                                                    '-'
                                                )}
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
                                                defaultValue="1"
                                                notFoundContent={
                                                    this.props.data.loading
                                                        ? <Spin size="small" />
                                                        : null
                                                }
                                                filterOption={false}
                                            >
                                                {this.renderCategories()}
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
                                <Button
                                    ghost
                                    type="primary"
                                    onClick={this.handleSubmit}
                                    loading={this.state.uploading}
                                >
                                    发布
                                </Button>
                                <a
                                    href="#"
                                    className="save-as-draft"
                                    onClick={this.handleDraft}
                                >
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
