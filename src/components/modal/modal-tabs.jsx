import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import {FormattedMessage} from 'react-intl';

import Modal from './modal.jsx';
import Box from '../box/box.jsx';
import styles from './modal-tabs.css';

const ModalTabsComponent = props => (
    <Modal
        className={classNames(styles.modalContent, props.className)}
        contentLabel={props.contentLabel}
        fullScreen={props.fullScreen}
        headerClassName={props.headerClassName}
        headerImage={props.headerImage}
        isRtl={props.isRtl}
        onHelp={props.onHelp}
        onRequestClose={props.onRequestClose}
    >
        <Box className={styles.body}>
            testing 123
        </Box>
    </Modal>
);

ModalTabsComponent.propTypes = {
    className: PropTypes.string,
    contentLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    fullScreen: PropTypes.bool,
    headerClassName: PropTypes.string,
    headerImage: PropTypes.string,
    isRtl: PropTypes.bool,
    onHelp: PropTypes.func,
    onRequestClose: PropTypes.func
};

export default ModalTabsComponent;
