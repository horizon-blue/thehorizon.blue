import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import FontAwesome from '../_global/FontAwesome';
import classNames from 'classnames';
import _ from 'lodash';

class ToolBar extends PureComponent {
    static propTypes = {
        editorState: PropTypes.object.isRequired,
        toggleBlockType: PropTypes.func.isRequired,
        toggleInlineStyle: PropTypes.func.isRequired,
    };

    BLOCK_TYPES = [
        { label: 'quote-left', style: 'blockquote' },
        { label: 'list-ul', style: 'unordered-list-item' },
        { label: 'list-ol', style: 'ordered-list-item' },
        { label: 'code', style: 'code-block' },
    ];

    renderBlockTypesIcons = () => {
        const { editorState, toggleBlockType } = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return this.BLOCK_TYPES.map(type =>
            <BlockIcon
                key={type.label}
                type={type}
                blockType={blockType}
                toggleBlockType={toggleBlockType}
            />
        );
    };

    INLINE_STYLES = [
        { label: 'bold', style: 'BOLD' },
        { label: 'italic', style: 'ITALIC' },
        { label: 'underline', style: 'UNDERLINE' },
        { label: 'terminal', style: 'CODE' },
        { label: 'strikethrough', style: 'STRIKETHROUGH' },
    ];

    renderHeaderIcon = () => {
        const { editorState, toggleBlockType } = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return (
            <HeaderIcon
                blockType={blockType}
                toggleBlockType={toggleBlockType}
            />
        );
    };

    renderInlineStypeIcons = () => {
        const currentStyle = this.props.editorState.getCurrentInlineStyle();
        return this.INLINE_STYLES.map(type =>
            <InlineIcon
                type={type}
                currentStyle={currentStyle}
                key={type.label}
                toggleInlineStyle={this.props.toggleInlineStyle}
            />
        );
    };

    render = () => {
        return (
            <div className="toolbar-container">
                {this.renderHeaderIcon()}
                {this.renderInlineStypeIcons()}
                {this.renderBlockTypesIcons()}
            </div>
        );
    };
}

class BlockIcon extends PureComponent {
    static propTypes = {
        type: PropTypes.object.isRequired,
        toggleBlockType: PropTypes.func.isRequired,
        blockType: PropTypes.string.isRequired,
    };

    onToggle = e => {
        const { toggleBlockType, type } = this.props;

        e.preventDefault();
        toggleBlockType(type.style);
    };

    render = () => {
        const { type, blockType } = this.props;
        return (
            <Tooltip title={type.style} mouseEnterDelay={1} key={type.label}>
                <div
                    className={classNames('toolbar-button', {
                        active: type.style === blockType,
                    })}
                    onClick={this.onToggle}
                >
                    <FontAwesome name={type.label} />
                </div>
            </Tooltip>
        );
    };
}

class InlineIcon extends PureComponent {
    static propTypes = {
        type: PropTypes.object.isRequired,
        toggleInlineStyle: PropTypes.func.isRequired,
        currentStyle: PropTypes.object.isRequired,
    };

    onToggle = e => {
        const { toggleInlineStyle, type } = this.props;
        e.preventDefault();
        toggleInlineStyle(type.style);
    };

    render = () => {
        const { type, currentStyle } = this.props;

        return (
            <Tooltip title={type.style} mouseEnterDelay={1} key={type.label}>
                <div
                    className={classNames('toolbar-button', {
                        active: currentStyle.has(type.style),
                    })}
                    key={type.label}
                    onClick={this.onToggle}
                >
                    <FontAwesome name={type.label} />
                </div>
            </Tooltip>
        );
    };
}

class HeaderIcon extends PureComponent {
    static propTypes = {
        toggleBlockType: PropTypes.func.isRequired,
        blockType: PropTypes.string.isRequired,
    };

    HEADER_TYPES = [
        'header-one',
        'header-two',
        'header-three',
        'header-four',
        'header-five',
        'header-six',
        'unstyled',
    ];

    onToggle = e => {
        const { blockType, toggleBlockType } = this.props;
        const thisHeader = _.indexOf(this.HEADER_TYPES, blockType);
        const nextHeader = (thisHeader + 1) % this.HEADER_TYPES.length;
        e.preventDefault();
        toggleBlockType(this.HEADER_TYPES[nextHeader]);
    };

    render = () => {
        const { blockType } = this.props;
        const thisHeader = _.indexOf(this.HEADER_TYPES, blockType);
        const nextHeader = (thisHeader + 1) % this.HEADER_TYPES.length;
        return (
            <Tooltip
                title={this.HEADER_TYPES[nextHeader]}
                mouseEnterDelay={0.5}
                key={this.HEADER_TYPES[nextHeader]}
            >
                <div
                    className={classNames('toolbar-button', {
                        active:
                            thisHeader !== -1 &&
                                thisHeader !== this.HEADER_TYPES.length - 1,
                    })}
                    onClick={this.onToggle}
                >
                    <FontAwesome name="header" />
                </div>
            </Tooltip>
        );
    };
}

export default ToolBar;
