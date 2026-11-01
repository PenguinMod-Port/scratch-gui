import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import pauseIcon from './icon--pause-button.svg';
import playIcon from './icon--play-button.svg';
import styles from './pause-button.css';

const PauseButtonComponent = function (props) {
    const {
        paused,
        className,
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <img
            className={classNames(
                className,
                styles.pauseBtn
            )}
            draggable={false}
            src={paused ? playIcon : pauseIcon}
            title={title}
            onClick={onClick}
            {...componentProps}
        />
    );
};

PauseButtonComponent.propTypes = {
    paused: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};

PauseButtonComponent.defaultProps = {
    paused: false,
    title: 'Pause'
};

export default PauseButtonComponent;
