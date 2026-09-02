import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import CommentEditorComponent from '../components/comment-editor/comment-editor.jsx';
import {connect} from 'react-redux';

const DEFAULT_COMMENT_COLOR = '#fef49c';

class CommentEditor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setupState',
            'getPreviewColor',
            'getPreviewStyles',
            'handleChangeColor',
            'handleChangeTextColor',
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
    setupState () {
        const currentData = this.props.comment.data;

        this.state.color = currentData.color ?? DEFAULT_COMMENT_COLOR;
        this.state.txtColor = currentData.txtColor ?? '#000000';
        this.state.opacity = currentData.opacity ?? 100;
        this.state.font = currentData.font ?? 'arial';
        this.state.textAlign = currentData.textAlign ?? 'left';
        this.state.fontSize = currentData.fontSize ?? 16;
        this.state.bold = currentData.bold ?? false;
        this.state.italic = currentData.italic ?? false;
    }
    handleCancel () {
        this.props.onRequestClose();
    }
    handleOk () {
        this.props.comment.setData(this.state);
        this.props.onRequestClose();
    }
    handleMarkdownHelp () {
        alert("TOODO write this");
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
            fontWeight: this.state.bold ? 'bold' : 'normal',
            fontStyle: this.state.italic ? 'italic' : 'normal'
        };
    }
    handleChangeColor (event) {
        let hex = String(event.target.value);
        if (!hex.startsWith('#')) hex = DEFAULT_COMMENT_COLOR;

        this.setState({color: hex});
    }
    handleChangeTextColor (event) {
        let hex = String(event.target.value);
        if (!hex.startsWith('#')) hex = '#000000';

        this.setState({txtColor: hex});
    }
    handleSetOpacity (event) {
        value = Number(event.target.value) || 100;
        const opacity = Math.max(10, Math.min(100, value));

        this.setState({opacity: opacity});
    }
    handleSetFont (event) {
        const font = String(event.target.value) || 'arial';
        this.setState({font: font });
    }
    handleSetFontSize (event) {
        value = Number(event.target.value) || 16;
        const size = Math.max(2, Math.min(150, value));

        this.setState({fontSize: size});
    }
    handleSetAlignment (event) {
        const validAlignments = ['left', 'center', 'right'];
        const value = String(event.target.value).toLowerCase();

        if (validAlignments.includes(alignment)) {
            this.setState({textAlign: alignment});
        }
    }
    handleSetBold (event) {
        this.setState({bold: event.target.checked});
    } 
    handleSetItalic (event) {
        this.setState({italic: event.target.checked});
    }
    render () {
        this.setupState();
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
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            />
        );
    }
}

CommentEditor.propTypes = {
    data: PropTypes.instanceOf(Object),
    onRequestClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    comment: state.scratchGui.commentEditor.comment
});

export default connect(
    mapStateToProps
)(CommentEditor);
