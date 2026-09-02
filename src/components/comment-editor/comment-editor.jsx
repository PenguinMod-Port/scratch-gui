import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import Label from '../forms/label.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './comment-editor.css';

const messages = defineMessages({
    commentEditorModalTitle: {
        defaultMessage: 'Comment Editor',
        description: 'Title for the modal where you customize comments.',
        id: 'pm.gui.commentEditor.commentEditorModalTitle'
    },

    commentColor: {
        defaultMessage: 'Comment color',
        description: 'Title for the input where you customize comment color.',
        id: 'pm.gui.commentEditor.commentColor'
    },
    textColor: {
        defaultMessage: 'Text color',
        description: 'Title for the input where you customize comment text color.',
        id: 'pm.gui.commentEditor.textColor'
    },
    commentOpacity: {
        defaultMessage: 'Background opacity',
        description: 'Title for the input where you customize comment opacity.',
        id: 'pm.gui.commentEditor.commentOpacity'
    },

    font: {
        defaultMessage: 'Font',
        description: 'Title for the input where you customize comment font.',
        id: 'pm.gui.commentEditor.font'
    },
    fontSize: {
        defaultMessage: 'Font size',
        description: 'Title for the input where you customize comment font size.',
        id: 'pm.gui.commentEditor.fontSize'
    },
    alignment: {
        defaultMessage: 'Alignment',
        description: 'Title for the input where you customize comment text alignment.',
        id: 'pm.gui.commentEditor.alignment'
    },

    left: {
        defaultMessage: 'left',
        description: 'Text left alignment',
        id: 'pm.gui.commentEditor.left'
    },
    right: {
        defaultMessage: 'right',
        description: 'Text right alignment',
        id: 'pm.gui.commentEditor.right'
    },
    center: {
        defaultMessage: 'center',
        description: 'Text center alignment',
        id: 'pm.gui.commentEditor.center'
    }
});

const CommentEditor = props => {
    return (
    <Modal
        className={styles.modalContent}
        contentLabel={props.intl.formatMessage(messages.commentEditorModalTitle)}
        onRequestClose={props.onCancel}
        id="commentEditorModal"
    >
        <Box className={styles.body}>
            <div className={styles.previewOuter}>
                <div
                    className={styles.previewInner}
                    style={{background: props.getPreviewColor()}}
                >
                    <span
                        style={props.getPreviewStyles()}
                    >
                        Aa
                    </span>
                </div>
            </div>
            <div className={styles.container}>
                <Label text={props.intl.formatMessage(messages.commentColor)}>
                    <input
                        type="color"
                        value={props.data.color}
                        className={styles.presetColor}
                        onChange={props.onSetColor}
                    />
                </Label>
                <Label text={props.intl.formatMessage(messages.commentOpacity)}>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={props.data.opacity}
                        className={styles.opacitySlider}
                        onChange={props.onSetOpacity}
                    />
                </Label>
            </div>
            <Label text={props.intl.formatMessage(messages.textColor)}>
                <input
                    type="color"
                    value={props.data.txtColor}
                    className={styles.presetColor}
                    onChange={props.onSetTextColor}
                />
            </Label>
            <div className={styles.breaker}></div>
            <div className={styles.container}>
                <Label text={props.intl.formatMessage(messages.font)}>
                    <input
                        type="text"
                        value={props.data.font}
                        className={styles.textField}
                        onChange={props.onSetFont}
                    />
                </Label>
                <Label text={props.intl.formatMessage(messages.fontSize)}>
                    <input
                        type="number"
                        min="2"
                        max="100"
                        value={props.data.fontSize}
                        className={styles.textField}
                        onChange={props.onSetFontSize}
                    />
                </Label>
            </div>
            <Label text={props.intl.formatMessage(messages.alignment)}>
                <select
                    value={props.data.textAlign}
                    className={styles.textField}
                    onChange={props.onSetAlignment}
                    onClick={e => e.stopPropagation()}
                >
                    <option value="left">{props.intl.formatMessage(messages.left)}</option>
                    <option value="center">{props.intl.formatMessage(messages.center)}</option>
                    <option value="right">{props.intl.formatMessage(messages.right)}</option>
                </select>
            </Label>
            <label className={styles.labelContainer}>
                <input
                    type="checkbox"
                    checked={props.data.bold}
                    className={styles.checkbox}
                    onChange={props.onSetBold}
                />
                <FormattedMessage
                    defaultMessage="Bold letters"
                    description="Label for making comment text bold"
                    id="pm.gui.commentEditor.bolds"
                />
            </label>
            <label className={styles.labelContainer}>
                <input
                    type="checkbox"
                    checked={props.data.italic}
                    className={styles.checkbox}
                    onChange={props.onSetItalic}
                />
                <FormattedMessage
                    defaultMessage="Italic letters"
                    description="Label for button for making comment text italic"
                    id="pm.gui.commentEditor.italics"
                />
            </label>
             <Box className={classNames(styles.buttonRow, styles.centerRow)}>
                <button
                    className={styles.markdownHelp}
                    onClick={props.onMarkdownHelp}
                >
                    <FormattedMessage
                        defaultMessage="Markdown Help"
                        description="Label for button to show markdown help message"
                        id="pm.gui.commentEditor.mdHelp"
                    />
                </button>
            </Box>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Cancel"
                        description="Label for button to cancel comment edits"
                        id="pm.gui.commentEditor.cancel"
                    />
                </button>
                <button
                    className={styles.okButton}
                    onClick={props.onOk}
                >
                    <FormattedMessage
                        defaultMessage="OK"
                        description="Label for button to save new comment settings"
                        id="pm.gui.commentEditor.ok"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
)};

CommentEditor.propTypes = {
    data: PropTypes.object.isRequired,
    getPreviewColor: PropTypes.func.isRequired,
    getPreviewStyles: PropTypes.func.isRequired,
    onSetColor: PropTypes.func.isRequired,
    onSetTextColor: PropTypes.func.isRequired,
    onSetOpacity: PropTypes.func.isRequired,
    onSetFont: PropTypes.func.isRequired,
    onSetFontSize: PropTypes.func.isRequired,
    onSetAlignment: PropTypes.func.isRequired,
    onSetBold: PropTypes.func.isRequired,
    onSetItalic: PropTypes.func.isRequired,
    onMarkdownHelp: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
};

export default injectIntl(CommentEditor);
