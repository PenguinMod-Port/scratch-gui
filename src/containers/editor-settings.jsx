import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {closeEditorSettingsModal} from '../reducers/modals';

import ModalTabsComponent from '../components/modal/modal-tabs.jsx';

const messages = defineMessages({
    title: {
        defaultMessage: 'Editor Settings',
        description: 'Title for the editor settings modal',
        id: 'pm.gui.editorSettings.title'
    }
});

class EditorSettingsModal extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        console.log(this);
        return <ModalTabsComponent
            onRequestClose={this.props.closeEditorSettingsModal}
            contentLabel={this.props.intl.formatMessage(messages.title)}
            id="editorSettingsModal"
        />
    }
}

EditorSettingsModal.propTypes = {
    intl: intlShape
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    closeEditorSettingsModal: () => dispatch(closeEditorSettingsModal())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorSettingsModal));