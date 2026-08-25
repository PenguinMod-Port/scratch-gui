import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import classNames from 'classnames';

import styles from './splash-modal.css';

const messages = defineMessages({

});

const SplashModalComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel={''}
        id="splashModal"
    >
        <Box className={styles.body}>
            {/* PLACEHOLDER until im not lazy and can finish it */}
            current state of gta 6<br />
            <img src="https://media.tenor.com/g9f04cXgEtEAAAAe/idksterling-sterling.png" width="200px" />
        </Box>
    </Modal>
);

SplashModalComponent.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func.isRequired,
};

export default injectIntl(SplashModalComponent);
