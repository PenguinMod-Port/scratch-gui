import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import {FormattedMessage} from 'react-intl';

import Modal from '../../containers/modal.jsx';
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
            <div className={styles.tabs}>
                {props.tabs.map((tab, index) => (
                    <React.Fragment key={index}>
                        <button className={classNames(styles.tabButton, {[styles.selected]: index === props.currentTab})} onClick={props.onTabChange && (() => props.onTabChange(index))}>{tab.title}</button>
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.tabContent}>
                {props.tabs[props.currentTab].content}
            </div>
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
    onRequestClose: PropTypes.func,

    tabs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.node.isRequired
    })).isRequired,
    currentTab: PropTypes.number.isRequired,
    onTabChange: PropTypes.func
};

export default ModalTabsComponent;
