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
                    title: "tab 1",
                    content: <div>tab 1 content</div>
                },
                {
                    title: "tab 2",
                    content: <div>tab 2 content</div>
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