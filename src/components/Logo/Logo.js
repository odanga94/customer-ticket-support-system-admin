import React from 'react';
import appLogo from '../../assets/images/appLogo.png';
import styles from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={styles.Logo} style={{height: props.height}}>
            <img src={appLogo} alt="appLogo" />
        </div>
    );
}

export default logo;