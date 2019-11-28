import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import plusIcon from '../../../assets/images/plus-svgrepo-com.png';

const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <Logo height="80%" />
            <div className={styles.RightSide}>
                {props.isAuth ? <img 
                    className={styles.Image} 
                    src={plusIcon} 
                    alt="Create Ticket" 
                    onClick={props.plusIconClicked}
                /> : null}
                <nav className={styles.DesktopOnly}>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </header>
    );
}

export default toolbar;