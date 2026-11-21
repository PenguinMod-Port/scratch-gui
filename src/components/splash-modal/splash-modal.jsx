import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import classNames from 'classnames';
import VM from 'scratch-vm';

import { APP_NAME, DOC_SITE, HOME_SITE, WIKI_SITE } from '../../lib/brand.js';

import styles from './splash-modal.css';

const SplashModalComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel={APP_NAME}
        id="splashModal"
    >
        <Box className={styles.body}>
            <Box className={styles.column}>
                <a onClick={props.onClose}>
                    <FormattedMessage
                        defaultMessage="New Project"
                        description="Button on splash screen to make a new project."
                        id="pm.gui.splashModal.newProject"
                    />
                </a>
                <a onClick={() => {props.onClose(); props.onStartSelectingFileUpload();}}>
                    <FormattedMessage
                        defaultMessage="Load Project"
                        description="Button on splash screen to load a project."
                        id="pm.gui.splashModal.loadProject"
                    />
                </a>
                <a onClick={props.onOpenExtensionModal}>
                    <FormattedMessage
                        defaultMessage="Load Extension"
                        description="Button on splash screen to load an extension."
                        id="pm.gui.splashModal.loadExtension"
                    />
                </a>
                <a onClick={props.onOpenRestoreModal}>
                    <FormattedMessage
                        defaultMessage="Restore Points"
                        description="Button on splash screen to open the restore points modal."
                        id="pm.gui.splashModal.restorePoints"
                    />
                </a>
            </Box>
            <Box className={styles.column}>
                <a href={HOME_SITE} target="_blank">
                    <FormattedMessage
                        defaultMessage="Home Page"
                        description="Button on splash screen to open the home page."
                        id="pm.gui.splashModal.homePage"
                    />
                </a>
                <a href={DOC_SITE} target="_blank">
                    <FormattedMessage
                        defaultMessage="Documentation"
                        description="Button on splash screen to open the documentation."
                        id="pm.gui.splashModal.docs"
                    />
                </a>
                <a href={WIKI_SITE} target="_blank">
                    <FormattedMessage
                        defaultMessage="Wiki"
                        description="Button on splash screen to open the wiki."
                        id="pm.gui.splashModal.wiki"
                    />
                </a>
            </Box>
            <span className={styles.version}>v{props.vm.runtime.pmVersion.toString()}</span>
        </Box>
    </Modal>
);

SplashModalComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    onOpenExtensionModal: PropTypes.func.isRequired,
    onOpenRestoreModal: PropTypes.func.isRequired,
    onStartSelectingFileUpload: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default SplashModalComponent;
