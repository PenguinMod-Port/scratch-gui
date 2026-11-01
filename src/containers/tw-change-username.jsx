import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import {openUsernameModal} from '../reducers/modals';
import {closeEditMenu} from '../reducers/menus';
import isScratchDesktop from '../lib/isScratchDesktop';
import {APP_NAME} from '../lib/brand';

const messages = defineMessages({
    cannotChangeWhileRunning: {
        defaultMessage: 'Username cannot be changed while the project is running.',
        description: 'Alert that appears when trying to change username while project is running',
        id: 'tw.changeUsername.cannotChangeWhileRunning'
    },
    cannotChangeWhileLoggedIn: {
        defaultMessage: 'Username cannot be changed if you are logged into {APP_NAME}.',
        description: 'Alert that appears when trying to change username while logged in.',
        id: 'pm.gui.changeUsername.cannotChangeWhileLoggedIn'
    }
});

class ChangeUsername extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'changeUsername'
        ]);
    }
    changeUsername () {
        if (this.props.usernameLoggedIn) {
            // eslint-disable-next-line no-alert
            alert(this.props.intl.formatMessage(messages.cannotChangeWhileLoggedIn, {APP_NAME}));
            return;
        } else if (this.props.running && !isScratchDesktop()) {
            // eslint-disable-next-line no-alert
            alert(this.props.intl.formatMessage(messages.cannotChangeWhileRunning));
            return;
        }
        this.props.onOpenUsernameModal();
    }
    render () {
        return this.props.children(this.changeUsername);
    }
}

ChangeUsername.propTypes = {
    children: PropTypes.func,
    onOpenUsernameModal: PropTypes.func,
    running: PropTypes.bool,
    intl: intlShape,
    usernameLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
    running: state.scratchGui.vmStatus.running,
    usernameLoggedIn: state.scratchGui.tw.usernameLoggedIn
});

const mapDispatchToProps = dispatch => ({
    onOpenUsernameModal: () => {
        dispatch(openUsernameModal());
        dispatch(closeEditMenu());
    }
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeUsername));
