import React, { PureComponent } from 'react';
import { Row, Col, Affix } from 'antd';
import classNames from 'classnames';
import Editor from 'draft-js-plugins-editor';
import PropTypes from 'prop-types';
import { RichUtils, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ToolBar from './ToolBar';
import styleMap from './styleMap';
import keyboardBindingFn from './keyboardBindingFn';
import LoadingPage from '../_global/LoadingPage';
import { connect } from 'react-redux';
import './prism.css';
import { SAVE_DRAFT } from '../../store/reducer/actionTypes';

// draftjs plugins
import createCounterPlugin from 'draft-js-counter-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import prismPlugin from './prismPlugin';
const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, LineCounter } = counterPlugin;

const plugins = [prismPlugin, createMarkdownShortcutsPlugin(), counterPlugin];

const Separator = props => <span className="separator">|</span>;

function mapStateToProps(state, ownProps) {
    return {
        draft: state.draft,
        rehydrated: state.rehydrated,
    };
}

@connect(mapStateToProps)
class PostEditor extends PureComponent {
    static propTypes = {
        draft: PropTypes.any,
        rehydrated: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
    };

    state = {};

    componentWillReceiveProps(nextProps) {
        if (nextProps.rehydrated && !this.state.editorState) {
            this.setState({ title: nextProps.draft.title || '' });
            this.setState({
                editorState: nextProps.draft.content
                    ? EditorState.createWithContent(
                          convertFromRaw(nextProps.draft.content)
                      )
                    : EditorState.createEmpty(),
            });
        }
    }

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

    handleKeyCommand = command => {
        if (command === 'myeditor-save') {
            this.props.dispatch({
                type: SAVE_DRAFT,
                draft: {
                    title: this.state.title,
                    content: convertToRaw(
                        this.state.editorState.getCurrentContent()
                    ),
                },
            });
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

    render = () => {
        if (!this.state.editorState) return <LoadingPage />;
        return (
            <div>
                <Row type="flex" justify="center" className="post-editor">
                    <Col sm={22} xs={24}>
                        <div className="affix-container">
                            <Affix>
                                <input
                                    type="text"
                                    className="editor-field"
                                    value={this.state.title}
                                    onChange={this.onTitleChange}
                                    placeholder="无题 | Untitled"
                                />
                                <hr />
                                <div className="editor-field">
                                    <ToolBar
                                        toggleBlockType={this._toggleBlockType}
                                        toggleInlineStyle={
                                            this._toggleInlineStyle
                                        }
                                        editorState={this.state.editorState}
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
                    </Col>
                </Row>
                {this.renderWordCountFooter()}
            </div>
        );
    };
}

export default PostEditor;
