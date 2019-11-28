import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux'

const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            { props.isAuthenticated ?
                <Aux>
                    <NavigationItem link="/" active>Home</NavigationItem>
                    <NavigationItem link="/my-account">My Account</NavigationItem>
                    <NavigationItem link="/logout">Log Out</NavigationItem> 
                </Aux>
                :
                <NavigationItem link="/auth">Log In</NavigationItem>
            }    
        </ul>
    );
}

export default navigationItems;