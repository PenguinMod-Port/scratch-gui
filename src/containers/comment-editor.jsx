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
    getPreviewColor () {
        return this.state.color + (this.state.opacity * 2.55).toString(16);
    }
    getPreviewStyles () {
        let styles = '';

        `color: ${props.data.txtColor}; font-family: ${props.data.font}; text-align: ${props.data.textAlign}; font-weight
            bold: false,
            italic: false`

            return styles;
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
    handleSetOpacity (value) {
        const opacity = Math.max(10, Math.min(100, value));

        this.setState({opacity: opacity});
    }
    handleSetFont (font) {
        this.setState({font: String(font) || 'arial'});
    }
    handleSetFontSize (value) {
        const size = Math.max(2, Math.min(150, value));

        this.setState({fontSize: size});
    }
    handleSetAlignment (value) {
        const validAlignments = ['left', 'center', 'right'];
        const alignment = String(value).toLowerCase() ?? 'left';

        if (validAlignments.includes(alignment)) {
            this.setState({textAlign: alignment});
        }
    }
    handleSetBold (isBold) {
        this.setState({bold: isBold});
    } 
    handleSetItalic (isItalic) {
        this.setState({italic: isBold});
    }
    render () {
        console.log(this); // TOODO
        this.setupState();
        return (
            <CommentEditorComponent
                mode={this.props.mode}
                data={this.props.comment.data}
                onSetColor={this.handleChangeColor}
                onSetTextColor={this.handleChangeTextColor}
                onSetOpacity={this.handleSetOpacity}
                onSetFont={this.handleSetFont}
                onSetFontSize={this.handleSetFontSize}
                onSetAlignment={this.handleSetAlignment}
                onSetBold={this.handleSetBold}
                onSetItalic={this.handleSetItalic}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            />
        );
    }
}

CommentEditor.propTypes = {
    mode: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    onRequestClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    comment: state.scratchGui.commentEditor.comment
});

export default connect(
    mapStateToProps
)(CommentEditor);
