import React, { PureComponent } from 'react';
import { Row, Col, Affix } from 'antd';
import classNames from 'classnames';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ToolBar from './ToolBar';

// const Separator = props => <span className="separator">|</span>;

class PostEditor extends PureComponent {
    state = {
        editorState: EditorState.createEmpty(),
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

    handleKeyCommand = command => {
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

    focus = e => this.editor.focus();

    render = () => {
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
                                handleKeyCommand={this.handleKeyCommand}
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
