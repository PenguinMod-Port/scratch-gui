import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SplashModalComponent from '../components/splash-modal/splash-modal.jsx';
import {closeSplashModal} from '../reducers/modals';
import VM from 'scratch-vm';

const SplashModal = props => (
    <SplashModalComponent {...props} />
);

SplashModal.propTypes = {
    onClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeSplashModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashModal);
