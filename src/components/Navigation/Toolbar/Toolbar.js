import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <Logo height="80%" />
            <div className={styles.RightSide}>
                <nav className={styles.DesktopOnly}>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </header>
    );
}

export default toolbar;