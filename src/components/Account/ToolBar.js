import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import FontAwesome from '../_global/FontAwesome';
import classNames from 'classnames';

class ToolBar extends PureComponent {
    static propTypes = {
        editorState: PropTypes.object.isRequired,
        toggleBlockType: PropTypes.func.isRequired,
        toggleInlineStyle: PropTypes.func.isRequired,
    };

    renderBlockIcon = (type, blockType) => {
        const { toggleBlockType } = this.props;
        const onToggle = e => {
            e.preventDefault();
            toggleBlockType(type.style);
        };
        return (
            <Tooltip title={type.description} mouseEnterDelay={1}>
                <div
                    className={classNames('toolbar-button', {
                        active: type.style === blockType,
                    })}
                    key={type.label}
                    onClick={onToggle}
                >
                    <FontAwesome name={type.label} />
                </div>
            </Tooltip>
        );
    };

    BLOCK_TYPES = [
        { label: 'quote-left', style: 'blockquote' },
        { label: 'list-ul', style: 'unordered-list-item' },
        { label: 'list-ol', style: 'ordered-list-item' },
        { label: 'code', style: 'code-block' },
    ];

    renderBlockTypesIcons = () => {
        const { editorState } = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return this.BLOCK_TYPES.map(type =>
            this.renderBlockIcon(type, blockType)
        );
    };

    renderBlockIcon = (type, blockType) => {
        const { toggleBlockType } = this.props;
        const onToggle = e => {
            e.preventDefault();
            toggleBlockType(type.style);
        };
        return (
            <Tooltip title={type.style} mouseEnterDelay={1} key={type.label}>
                <div
                    className={classNames('toolbar-button', {
                        active: type.style === blockType,
                    })}
                    onClick={onToggle}
                >
                    <FontAwesome name={type.label} />
                </div>
            </Tooltip>
        );
    };

    INLINE_STYLES = [
        { label: 'bold', style: 'BOLD' },
        { label: 'italic', style: 'ITALIC' },
        { label: 'underline', style: 'UNDERLINE' },
        { label: 'terminal', style: 'CODE' },
    ];

    renderInlineIcon = (type, currentStyle) => {
        const { toggleInlineStyle } = this.props;
        const onToggle = e => {
            e.preventDefault();
            toggleInlineStyle(type.style);
        };
        return (
            <Tooltip title={type.style} mouseEnterDelay={1} key={type.label}>
                <div
                    className={classNames('toolbar-button', {
                        active: currentStyle.has(type.style),
                    })}
                    key={type.label}
                    onClick={onToggle}
                >
                    <FontAwesome name={type.label} />
                </div>
            </Tooltip>
        );
    };

    renderInlineStypeIcons = () => {
        const currentStyle = this.props.editorState.getCurrentInlineStyle();
        return this.INLINE_STYLES.map(type =>
            this.renderInlineIcon(type, currentStyle)
        );
    };

    render = () => {
        return (
            <div className="toolbar-container">
                {this.renderInlineStypeIcons()}
                {this.renderBlockTypesIcons()}
            </div>
        );
    };
}

export default ToolBar;
