import React from 'react';

import styles from './PriorityColor.module.css';

const priorityColor = (props) => {
    return(
        <div className={`${styles.Box} ${styles[props.priority]}`}>

        </div>
    )
}

export default priorityColor;