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
    componentDidMount () {
        this.setupState();
    }
    setupState () {
        const currentData = this.props.comment.data;

        this.setState({
            color: currentData.color ?? DEFAULT_COMMENT_COLOR,
            txtColor: currentData.txtColor ?? '#000000',
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
            fontSize: this.state.fontSize + "px",
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
        let opacity = Number(event.target.value) || 100;
        opacity = Math.max(10, Math.min(100, opacity));

        this.setState({opacity: opacity});
    }
    handleSetFont (event) {
        const font = String(event.target.value) || 'arial';
        this.setState({font: font});
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
