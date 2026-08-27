import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import LazyScratchBlocks from '../../lib/tw-lazy-scratch-blocks';

import dropperIcon from './icon--dropper.svg';

import branchInputIcon from './icon--branch-input.svg';
import booleanInputIcon from './icon--boolean-input.svg';
import textInputIcon from './icon--text-input.svg';
import numberInputIcon from './icon--number-input.svg';
import angleInputIcon from './icon--angle-input.svg';
import colorInputIcon from './icon--color-input.svg';
import pianoInputIcon from './icon--piano-input.svg';
import labelIcon from './icon--label.svg';

import styles from './custom-procedures.css';

const inputIcons = {
    'number or text': textInputIcon,
    number: numberInputIcon,
    angle: angleInputIcon,
    color: colorInputIcon,
    piano: pianoInputIcon
};

const messages = defineMessages({
    myblockModalTitle: {
        defaultMessage: 'Make a Block',
        description: 'Title for the modal where you create a custom block.',
        id: 'gui.customProcedures.myblockModalTitle'
    },

    forceOutputAuto: {
        defaultMessage: 'auto',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.0'
    },
    forceOutputHexagonal: {
        defaultMessage: 'hexagonal',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.1'
    },
    forceOutputRound: {
        defaultMessage: 'round',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.2'
    },
    forceOutputSquare: {
        defaultMessage: 'square',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.3'
    },
    forceOutputLeaf: {
        defaultMessage: 'leaf',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.4'
    },
    forceOutputPlus: {
        defaultMessage: 'plus',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.5'
    },
    forceOutputOctagonal: {
        defaultMessage: 'octagonal',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.6'
    },
    forceOutputBumped: {
        defaultMessage: 'bumped',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.7'
    },
    forceOutputIndented: {
        defaultMessage: 'indented',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.8'
    },
    forceOutputScrapped: {
        defaultMessage: 'scrapped',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.9'
    },
    forceOutputArrow: {
        defaultMessage: 'arrow',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.10'
    },
    forceOutputTicket: {
        defaultMessage: 'ticket',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.11'
    },
    forceOutputSlanted: {
        defaultMessage: 'slanted',
        description: 'Label for forced output shapes',
        id: 'pm.gui.customProcedures.forceOutput.12'
    }

    inputText: {
        defaultMessage: "number or text",
        description: "Description of the number/text input type",
        id: "pm.gui.customProcedures.numberTextType"
    },
    inputNumber: {
        defaultMessage: "number",
        description: "Description of the number input type",
        id: "pm.gui.customProcedures.numberType"
    },
    inputAngle: {
        defaultMessage: "angle",
        description: "Description of the angle input type",
        id: "pm.gui.customProcedures.angleType"
    },
    inputColor: {
        defaultMessage: "color",
        description: "Description of the color input type",
        id: "pm.gui.customProcedures.colorType"
    },
    inputPiano: {
        defaultMessage: "piano",
        description: "Description of the piano input type",
        id: "pm.gui.customProcedures.pianoType"
    },
});

const CustomProcedures = props => {
    const ScratchBlocks = LazyScratchBlocks.get();

    const [argumentType, setArgumentType] = useState('number or text');

    const handleAddArgumentClick = () => {
        props.onAddTextNumber(argumentType);
    };

    const handleArgumentSelectChange = e => {
        setArgumentType(e.target.value);
    };

    return (
    <Modal
        className={styles.modalContent}
        contentLabel={props.intl.formatMessage(messages.myblockModalTitle)}
        onRequestClose={props.onCancel}
        id="customProceduresModal"
    >
        <Box
            className={styles.workspace}
            componentRef={props.componentRef}
        />
        <Box className={styles.body}>
            <div className={styles.optionsRow}>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={handleAddArgumentClick}
                >
                    <img
                        className={styles.optionIcon}
                        src={inputIcons[argumentType] || textInputIcon}
                        draggable={false}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add an input"
                            description="Label for button to add an number/text/other input"
                            id="gui.customProcedures.addAnInputNumberText"
                        />
                    </div>
                    <div className={styles.optionDescription}>
                        <select
                            value={argumentType}
                            onChange={handleArgumentSelectChange}
                            onClick={e => e.stopPropagation()}
                        >
                            <option value="number or text">{props.intl.formatMessage(messages.inputText)}</option>
                            <option value="number">{props.intl.formatMessage(messages.inputNumber)}</option>
                            <option value="angle">{props.intl.formatMessage(messages.inputAngle)}</option>
                            <option value="color">{props.intl.formatMessage(messages.inputColor)}</option>
                            <option value="piano">{props.intl.formatMessage(messages.inputPiano)}</option>
                        </select>
                    </div>
                </div>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddBoolean}
                >
                    <img
                        className={styles.optionIcon}
                        src={booleanInputIcon}
                        draggable={false}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add an input"
                            description="Label for button to add a boolean input"
                            id="gui.customProcedures.addAnInputBoolean"
                        />
                    </div>
                    <div className={styles.optionDescription}>
                        <FormattedMessage
                            defaultMessage="boolean"
                            description="Description of the boolean input type"
                            id="gui.customProcedures.booleanType"
                        />
                    </div>
                </div>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddCommand}
                >
                    <img
                        className={styles.optionIcon}
                        src={branchInputIcon}
                        draggable={false}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add an input"
                            description="Label for button to add a branch input"
                            id="pm.gui.customProcedures.addAnInputCommand"
                        />
                    </div>
                    <div className={styles.optionDescription}>
                        <FormattedMessage
                            defaultMessage="branch"
                            description="Description of the branch input type"
                            id="pm.gui.customProcedures.commandType"
                        />
                    </div>
                </div>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddLabel}
                >
                    <img
                        className={styles.optionIcon}
                        src={labelIcon}
                        draggable={false}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add a label"
                            description="Label for button to add a label"
                            id="gui.customProcedures.addALabel"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.colorPickerArea}>
                <div>
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.motion }}
                        onClick={() => props.setProcColor("motion")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.looks }}
                        onClick={() => props.setProcColor("looks")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.sounds }}
                        onClick={() => props.setProcColor("sounds")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.event }}
                        onClick={() => props.setProcColor("event")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.control }}
                        onClick={() => props.setProcColor("control")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.sensing }}
                        onClick={() => props.setProcColor("sensing")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.operators }}
                        onClick={() => props.setProcColor("operators")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.data }}
                        onClick={() => props.setProcColor("data")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.data_lists }}
                        onClick={() => props.setProcColor("data_lists")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.more }}
                        onClick={() => props.setProcColor("more")}
                    />
                    <button
                        className={styles.presetColor}
                        style={{ background: ScratchBlocks.Colours.pen }}
                        onClick={() => props.setProcColor("pen")}
                    />
                    <div className={styles.parentCustom}>
                        <input
                            type="color"
                            value={props.currentColor}
                            className={styles.presetColor}
                            onChange={props.onCustomColorChange}
                        />
                        <img
                            src={dropperIcon}
                            className={styles.customPlus}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.checkboxRow}>
                <label>
                    <input
                        checked={props.warp}
                        type="checkbox"
                        onChange={props.onToggleWarp}
                    />
                    <FormattedMessage
                        defaultMessage="Run without screen refresh"
                        description="Label for checkbox to run without screen refresh"
                        id="gui.customProcedures.runWithoutScreenRefresh"
                    />
                </label>
                <label>
                    <input
                        checked={props.terminal}
                        type="checkbox"
                        onChange={props.onToggleTerminal}
                    />
                    <FormattedMessage
                        defaultMessage="Capped block"
                        id="gui.customProcedures.terminal"
                    />
                </label>
                <label>
                    <FormattedMessage
                        defaultMessage="Output: "
                        description="Label for forced output shapes"
                        id="pm.gui.customProcedures.forceOutput"
                    />
                    <select
                        value={props.forceOutput}
                        onChange={e => props.onForceOutput(e.target.value)}
                    >
                        <option value="0">{props.intl.formatMessage(messages.forceOutputAuto)}</option>
                        <option value="1">{props.intl.formatMessage(messages.forceOutputHexagonal)}</option>
                        <option value="2">{props.intl.formatMessage(messages.forceOutputRound)}</option>
                        <option value="3">{props.intl.formatMessage(messages.forceOutputSquare)}</option>
                        <option value="4">{props.intl.formatMessage(messages.forceOutputLeaf)}</option>
                        <option value="5">{props.intl.formatMessage(messages.forceOutputPlus)}</option>
                        <option value="6">{props.intl.formatMessage(messages.forceOutputOctagonal)}</option>
                        <option value="7">{props.intl.formatMessage(messages.forceOutputBumped)}</option>
                        <option value="8">{props.intl.formatMessage(messages.forceOutputIndented)}</option>
                        <option value="9">{props.intl.formatMessage(messages.forceOutputScrapped)}</option>
                        <option value="10">{props.intl.formatMessage(messages.forceOutputArrow)}</option>
                        <option value="11">{props.intl.formatMessage(messages.forceOutputTicket)}</option>
                        <option value="12">{props.intl.formatMessage(messages.forceOutputSlanted)}</option>
                    </select>
                </label>
            </div>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Cancel"
                        description="Label for button to cancel custom procedure edits"
                        id="gui.customProcedures.cancel"
                    />
                </button>
                <button
                    className={styles.okButton}
                    onClick={props.onOk}
                >
                    <FormattedMessage
                        defaultMessage="OK"
                        description="Label for button to save new custom procedure"
                        id="gui.customProcedures.ok"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
)};

CustomProcedures.propTypes = {
    componentRef: PropTypes.func.isRequired,
    intl: intlShape,
    warp: PropTypes.bool.isRequired,
    terminal: PropTypes.bool.isRequired,
    forceOutput: PropTypes.number.isRequired,
    onAddBoolean: PropTypes.func.isRequired,
    onAddCommand: PropTypes.func.isRequired,
    onAddLabel: PropTypes.func.isRequired,
    onAddTextNumber: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onToggleWarp: PropTypes.func.isRequired,
    onToggleTerminal: PropTypes.func.isRequired,
    onForceOutput: PropTypes.func.isRequired,
    setProcColor: PropTypes.func.isRequired,
    onCustomColorChange: PropTypes.func.isRequired,
    currentColor: PropTypes.string
};

export default injectIntl(CustomProcedures);
