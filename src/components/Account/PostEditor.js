import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames';

// draft js plugins and styles
import { EditorState, RichUtils } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import 'draft-js/dist/Draft.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';

import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
// import createDragNDropUploadPlugin from 'draft-js-drag-n-drop-upload-plugin';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

// const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
//     handleUpload: mockUpload,
//     addImage: imagePlugin.addImage,
// });

const plugins = [
    // dragNDropFileUploadPlugin,
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
    createMarkdownShortcutsPlugin(),
    undoPlugin,
];

class PostEditor extends PureComponent {
    state = { editorState: EditorState.createEmpty(), title: undefined };

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

    onChange = editorState => this.setState({ editorState });
    onTitleChange = evt => this.setState({ title: evt.target.value });

    focus = () => {
        this.editor.focus();
    };

    render() {
        return (
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
                        <UndoButton />
                        <RedoButton />
                        <Editor
                            onFocus={() => this.setState({ hasFocus: true })}
                            onBlur={() => this.setState({ hasFocus: false })}
                            className="editor-field"
                            ref={element => {
                                this.editor = element;
                            }}
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            plugins={plugins}
                            handleKeyCommand={this.handleKeyCommand}
                        />
                        <AlignmentTool />
                    </div>
                </Col>
            </Row>
        );
    }
}

export default PostEditor;
