import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {closeEditorSettingsModal} from '../../reducers/modals.js';
import settings from '../../editor-settings/settings.js';
import styles from './editor-settings.css';

import ModalTabsComponent from '../modal/modal-tabs.jsx';
import { updateSettingsStore } from '../../reducers/editor-settings-store.js';

const messages = defineMessages({
    title: {
        defaultMessage: 'Editor Settings',
        description: 'Title for the editor settings modal',
        id: 'pm.gui.editorSettings.title'
    },
    gui: {
        defaultMessage: 'GUI',
        id: 'pm.gui.editorSettings.gui'
    },
    blocks: {
        defaultMessage: 'Blocks',
        id: 'pm.gui.editorSettings.blocks'
    },
    paint: {
        defaultMessage: 'Paint',
        id: 'pm.gui.editorSettings.paint'
    },
    sound: {
        defaultMessage: 'Sound',
        id: 'pm.gui.editorSettings.sound'
    },
    misc: {
        defaultMessage: 'Miscellaneous',
        id: 'pm.gui.editorSettings.misc'
    }
});

const Separator = props => <div className={styles.separator}></div>

const SettingsWrapper = connect(
    state => ({}),
    dispatch => ({
        onUpdateStore: () => dispatch(updateSettingsStore())
    })
)(props => <props.setting {...props} />);

class EditorSettingsModal extends React.Component {
    constructor (props) {
        super(props);

        bindAll(this, [
            'handleTabChange'
        ]);

        this.state = {
            currentTab: 0
        };
    }

    handleTabChange(index) {
        this.setState({
            currentTab: index
        })
    }

    render() {
        return <ModalTabsComponent
            onRequestClose={this.props.onClose}
            onTabChange={this.handleTabChange}
            contentLabel={this.props.intl.formatMessage(messages.title)}
            tabs={[
                {
                    title: this.props.intl.formatMessage(messages.gui),
                    content: <React.Fragment>
                        <SettingsWrapper setting={settings.splashModal} />
                        <Separator />
                        <SettingsWrapper setting={settings.stageLeft} />
                        <Separator />
                        <SettingsWrapper setting={settings.projectBlockCounter} />
                        <Separator />
                        <SettingsWrapper setting={settings.pmGallery} />
                        <SettingsWrapper setting={settings.twGallery} />
                        <SettingsWrapper setting={settings.showExtensionIds} />
                    </React.Fragment>
                },
                {
                    title: this.props.intl.formatMessage(messages.blocks),
                    content: <React.Fragment>
                        <SettingsWrapper setting={settings.blockColors} />
                        <SettingsWrapper setting={settings.cascadeProcedureColors} />
                        <SettingsWrapper setting={settings.mergeOperators} />
                        <SettingsWrapper setting={settings.hideLists} />
                        <Separator />
                        <SettingsWrapper setting={settings.commentColors} />
                        <SettingsWrapper setting={settings.blockCommentParent} />
                        <Separator />
                        <SettingsWrapper setting={settings.blockCornerRadius} />
                        <SettingsWrapper setting={settings.notchHeight} />
                        <SettingsWrapper setting={settings.notchSpacing} />
                        <SettingsWrapper setting={settings.hexagonalRoundness} />
                        <SettingsWrapper setting={settings.reporterHeightThreshold} />
                        <Separator />
                        <SettingsWrapper setting={settings.outputBubbleAutoTyping} />
                        <SettingsWrapper setting={settings.swatches} />
                        <SettingsWrapper setting={settings.disableExpandables} />
                        <Separator />
                        <SettingsWrapper setting={settings.twoColumnCategories} />
                        <SettingsWrapper setting={settings.blockCounter} />
                        <Separator />
                        <SettingsWrapper setting={settings.blockPinning} />
                        <SettingsWrapper setting={settings.categoryReordering} />
                    </React.Fragment>
                },
                {
                    title: this.props.intl.formatMessage(messages.paint),
                    content: <React.Fragment>
                        <SettingsWrapper setting={settings.paintMultiTool} />
                        <Separator />
                        <SettingsWrapper setting={settings.paintPenPressure} />
                        <SettingsWrapper setting={settings.paintScrollZoom} />
                    </React.Fragment>
                },
                {
                    title: this.props.intl.formatMessage(messages.sound),
                    content: <React.Fragment>
                        <SettingsWrapper setting={settings.soundDisplayDetail} />
                    </React.Fragment>
                },
                {
                    title: this.props.intl.formatMessage(messages.misc),
                    content: <React.Fragment>
                        <SettingsWrapper setting={settings.vmDebug} />
                        <SettingsWrapper setting={settings.test} />
                    </React.Fragment>
                }
            ]}
            currentTab={this.state.currentTab}
            id="editorSettingsModal"
        />
    }
}

EditorSettingsModal.propTypes = {
    intl: intlShape
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeEditorSettingsModal())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorSettingsModal));
