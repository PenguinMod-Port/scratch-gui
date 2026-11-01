import React from 'react';
import PropTypes from 'prop-types';
import styles from './monitor.css';
import DOMElementRenderer from '../../containers/dom-element-renderer.jsx';

const LargeMonitor = ({categoryColor, value}) => (
    <div className={styles.largeMonitor}>
        <div
            className={styles.largeValue}
            style={{
                background: categoryColor.background,
                color: categoryColor.text
            }}
        >
            {value instanceof HTMLElement ? (<DOMElementRenderer domElement={value} />) : value}
        </div>
    </div>
);

LargeMonitor.propTypes = {
    categoryColor: PropTypes.shape({
        background: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default LargeMonitor;
