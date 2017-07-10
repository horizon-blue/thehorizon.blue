import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames';
import { Editor, EditorState, RichUtils } from 'draft-js';
import decorator from './decorator';
import 'draft-js/dist/Draft.css';
import ToolBar from './ToolBar';

// const Separator = props => <span className="separator">|</span>;

class PostEditor extends PureComponent {
    state = {
        editorState: EditorState.createEmpty(decorator),
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

    render = () => {
        return (
            <div>
                <Row type="flex" justify="center" className="post-editor">
                    <Col sm={22} xs={24}>
                        <input
                            type="text"
                            className="editor-field"
                            value={this.state.title}
                            onChange={this.onTitleChange}
                            placeholder="标题"
                        />
                        <hr />
                        <div
                            className={classNames('editor-field', {
                                hasFocus: this.state.hasFocus,
                            })}
                        >
                            <ToolBar />

                            <Editor
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                                onFocus={this.setFocus}
                                onBlur={this.setBlur}
                                handleKeyCommand={this.handleKeyCommand}
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
