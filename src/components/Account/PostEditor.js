import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames';

// for draft.js
import { convertFromRaw, EditorState } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-counter-plugin/lib/plugin.css';

const focusPlugin = createFocusPlugin();
const richButtonsPlugin = createRichButtonsPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const blockDndPlugin = createBlockDndPlugin();
const counterPlugin = createCounterPlugin();

const { AlignmentTool } = alignmentPlugin;
const { CharCounter, WordCounter, LineCounter } = counterPlugin;

const decorator = composeDecorators(
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    resizeablePlugin.decorator,
    blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });
const plugins = [
    focusPlugin,
    alignmentPlugin,
    imagePlugin,
    resizeablePlugin,
    blockDndPlugin,
    counterPlugin,
    createMarkdownShortcutsPlugin({ decorator }),
];

const Separator = props => <span className="separator">|</span>;

const initialState = {
    entityMap: {
        '0': {
            type: 'image',
            mutability: 'IMMUTABLE',
            data: {
                src: 'http://localhost:3000/favicon.ico',
            },
        },
    },
    blocks: [
        {
            key: '9gm3s',
            text:
                'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
        {
            key: 'ov7r',
            text: ' ',
            type: 'atomic',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [
                {
                    offset: 0,
                    length: 1,
                    key: 0,
                },
            ],
            data: {},
        },
        {
            key: 'e23a8',
            text: 'See advanced examples further down …',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
    ],
};

class PostEditor extends PureComponent {
    state = {
        editorState: EditorState.createWithContent(
            convertFromRaw(initialState)
        ),
    };
    onTitleChange = evt => this.setState({ title: evt.target.value });
    onChange = editorState => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.setState({ hasFocus: true });
        this.editor.focus();
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

    setFocus = () => {
        this.setState({ hasFocus: true });
    };

    setBlur = () => {
        this.setState({ hasFocus: false });
    };

    render = () => {
        console.log(alignmentPlugin);
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
                            onClick={this.focus}
                        >
                            <Editor
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                                plugins={plugins}
                                onFocus={this.setFocus}
                                onBlur={this.setBlur}
                                ref={element => {
                                    this.editor = element;
                                }}
                            />
                            <AlignmentTool />
                        </div>
                    </Col>
                </Row>
                {this.renderWordCountFooter()}
            </div>
        );
    };
}

export default PostEditor;
