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
                <a onClick={props.onClose}>New Project</a>
                <a>Load Project</a>
                <a>Load Extension</a>
                <a>Restore Points</a>
            </Box>
            <Box className={styles.column}>
                <a href={HOME_SITE} target="_blank">Home Page</a>
                <a href={DOC_SITE} target="_blank">Documentation</a>
                <a href={WIKI_SITE} target="_blank">Wiki</a>
            </Box>
            <span className={styles.version}>v{props.vm.runtime.pmVersion.toString()}</span>
        </Box>
    </Modal>
);

SplashModalComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default SplashModalComponent;
