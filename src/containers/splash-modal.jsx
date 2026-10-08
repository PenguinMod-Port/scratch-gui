import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SplashModalComponent from '../components/splash-modal/splash-modal.jsx';
import {closeSplashModal, openCustomExtensionModal, openRestorePointModal} from '../reducers/modals';
import {activateTab, COSTUMES_TAB_INDEX} from '../reducers/editor-tab';
import {STAGE_DISPLAY_SCALE_METADATA, STAGE_DISPLAY_SIZES, STAGE_SIZE_MODES} from '../lib/layout-constants';
import {setStageSize} from '../reducers/stage-size';
import VM from 'scratch-vm';

const SplashModal = props => (
    <SplashModalComponent {...props} />
);

SplashModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onOpenExtensionModal: PropTypes.func.isRequired,
    onOpenRestoreModal: PropTypes.func.isRequired,
    onStartSelectingFileUpload: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeSplashModal()),
    onOpenExtensionModal: () => {
        dispatch(closeSplashModal());
        dispatch(openCustomExtensionModal());
    },
    onOpenRestoreModal: () => {
        dispatch(closeSplashModal());
        dispatch(openRestorePointModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashModal);
