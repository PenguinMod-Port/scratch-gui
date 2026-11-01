import React from 'react';
import styles from './vote-frame.css';

const VoteFrame = props => (
    <iframe
        className={styles.frame}
        src={`https://penguinmod.com/embed/vote?id=${props.id}#dark=${props.darkmode}`}
    ></iframe>
);

export default VoteFrame;
