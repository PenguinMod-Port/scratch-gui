import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {closeEditorSettingsModal} from '../../reducers/modals.js';
import settings from '../../editor-settings/settings.js';
import styles from './editor-settings.css';

import ModalTabsComponent from '../modal/modal-tabs.jsx';

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
    misc: {
        defaultMessage: 'Miscellaneous',
        id: 'pm.gui.editorSettings.misc'
    }
});

const Separator = props => <div className={styles.separator}></div>

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
                        <settings.splashModal />
                        <Separator />
                        <settings.showExtensionIds />
                    </React.Fragment>
                },
                {
                    title: this.props.intl.formatMessage(messages.blocks),
                    content: <React.Fragment>
                        <settings.blockColors />
                        <Separator />
                        <settings.hexagonalRoundness />
                        <settings.cascadeProcedureColors />
                        <Separator />
                        <settings.swatches />
                        <settings.disableExpandables />
                    </React.Fragment>
                },
                {
                    title: this.props.intl.formatMessage(messages.paint),
                    content: <React.Fragment>
                        <settings.paintMultiTool />
                        <Separator />
                        <settings.paintScrollZoom />
                    </React.Fragment>
                },
                {
                    title: this.props.intl.formatMessage(messages.misc),
                    content: <React.Fragment>
                        <settings.vmDebug />
                        <settings.test />
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
