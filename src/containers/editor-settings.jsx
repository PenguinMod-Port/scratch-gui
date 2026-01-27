import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';

import ModalTabsComponent from '../components/modal/modal-tabs.jsx';

const messages = defineMessages({
    title: {
        defaultMessage: 'Editor Settings',
        description: 'Title for the editor settings modal',
        id: 'pm.gui.editorSettings.title'
    }
});

const EditorSettingsModal = props => (
    <ModalTabsComponent
        contentLabel={props.intl.formatMessage(messages.title)}
        id="editorSettingsModal"
    />
);

export default injectIntl(EditorSettingsModal);