import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import CommentEditorComponent from '../components/comment-editor/comment-editor.jsx';
import {connect} from 'react-redux';
import LazyScratchBlocks from '../lib/tw-lazy-scratch-blocks';

class CommentEditor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setupState',
            'getPreviewColor',
            'getPreviewStyles',
            'handleChangeColor',
            'handleChangeTextColor',
            'handleUseBlockColor',
            'handleSetOpacity',
            'handleSetFont',
            'handleSetFontSize',
            'handleSetAlignment',
            'handleSetBold',
            'handleSetItalic',
            'handleMarkdownHelp',
            'handleCancel',
            'handleOk'
        ]);
        this.state = {
            color: null,
            txtColor: null,
            opacity: 100,
            font: 'arial',
            textAlign: 'left',
            fontSize: 16,
            bold: false,
            italic: false
        };
    }
    componentDidMount () {
        const ScratchBlocks = LazyScratchBlocks.get();
        this.DEFAULT_COMMENT_COLOR = ScratchBlocks.ScratchBubble.DEFAULT_COMMENT_COLOR;
        this.DEFAULT_COMMENT_TEXT_COLOR = ScratchBlocks.ScratchBubble.DEFAULT_COMMENT_TEXT_COLOR;

        this.setupState();
    }
    setupState () {
        const currentData = this.props.comment.data;

        this.setState({
            color: currentData.color ?? this.DEFAULT_COMMENT_COLOR,
            txtColor: currentData.txtColor ?? this.DEFAULT_COMMENT_TEXT_COLOR,
            opacity: currentData.opacity ?? 100,
            font: currentData.font ?? 'arial',
            textAlign: currentData.textAlign ?? 'left',
            fontSize: currentData.fontSize ?? 16,
            bold: currentData.bold ?? false,
            italic: currentData.italic ?? false
        });
    }
    handleCancel () {
        this.props.onRequestClose();
    }
    handleOk () {
        this.props.comment.setData(this.state);
        this.props.onRequestClose();
    }
    handleMarkdownHelp () {
        alert([
            'Comment Markdown Help\n',
            'TEXT FORMATTING\n',
            '**text**          Bold\n',
            '*text*             Italic\n',
            '~~text~~      Strikethrough\n\n',
            'HEADERS\n',
            '# text          Header 1\n',
            '## text        Header 2\n\n',
            'COLOR\n',
            '@c[#ff0000]text@c\n',
            'Changes the text color.\n\n',
            '@b[#ff0000]text@b\n',
            'Changes the highlight color.\n\n',
            'IMAGES\n',
            '@i url @i\n',
            'Displays an image from the given URL.'
        ].join(''));
    }
    getPreviewColor () {
        return `${this.state.color}${Math.round(this.state.opacity * 2.55)
            .toString(16)
            .padStart(2, '0')}`;
    }
    getPreviewStyles () {
        return {
            color: this.state.txtColor,
            fontFamily: this.state.font,
            textAlign: this.state.textAlign,
            fontSize: this.state.fontSize + 'px',
            fontWeight: this.state.bold ? 'bold' : 'normal',
            fontStyle: this.state.italic ? 'italic' : 'normal'
        };
    }
    handleChangeColor (event) {
        let hex = String(event.target.value);
        if (!hex.startsWith('#')) hex = this.DEFAULT_COMMENT_COLOR;

        this.setState({color: hex});
    }
    handleChangeTextColor (event) {
        let hex = String(event.target.value);
        if (!hex.startsWith('#')) hex = this.DEFAULT_COMMENT_TEXT_COLOR;

        this.setState({txtColor: hex});
    }
    handleUseBlockColor () {
        const isWorkspaceComment = this.props.comment.isComment;

        if (isWorkspaceComment) {
            this.setState({color: this.DEFAULT_COMMENT_COLOR, txtColor: this.DEFAULT_COMMENT_TEXT_COLOR});
        } else {
            const block = this.props.comment?.comment?.block_;
            if (!block) {
                console.warn("Block comment not connected to block?");
                return;
            }

            this.setState({color: block.colour_, txtColor: block.textColour});
        }
    }
    handleSetOpacity (event) {
        let opacity = Number(event.target.value) || 100;
        opacity = Math.max(10, Math.min(100, opacity));

        this.setState({opacity: opacity});
    }
    handleSetFont (event) {
        const font = String(event.target.value);
        if (font) {
            this.setState({font: font});
        }
    }
    handleSetFontSize (event) {
        let size = Number(event.target.value) || 16;
        size = Math.max(2, Math.min(100, size));

        this.setState({fontSize: size});
    }
    handleSetAlignment (event) {
        const validAlignments = ['left', 'center', 'right'];
        const value = String(event.target.value).toLowerCase();
        if (validAlignments.includes(value)) {
            this.setState({textAlign: value});
        }
    }
    handleSetBold (event) {
        this.setState({bold: event.target.checked});
    } 
    handleSetItalic (event) {
        this.setState({italic: event.target.checked});
    }
    render () {
        return (
            <CommentEditorComponent
                data={this.state}
                getPreviewColor={this.getPreviewColor}
                getPreviewStyles={this.getPreviewStyles}
                onSetColor={this.handleChangeColor}
                onSetTextColor={this.handleChangeTextColor}
                onSetOpacity={this.handleSetOpacity}
                onSetFont={this.handleSetFont}
                onSetFontSize={this.handleSetFontSize}
                onSetAlignment={this.handleSetAlignment}
                onSetBold={this.handleSetBold}
                onSetItalic={this.handleSetItalic}
                onMarkdownHelp={this.handleMarkdownHelp}
                onUseBlockColor={this.handleUseBlockColor}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            />
        );
    }
}

CommentEditor.propTypes = {
    comment: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    comment: state.scratchGui.commentEditor.comment
});

export default connect(
    mapStateToProps
)(CommentEditor);
