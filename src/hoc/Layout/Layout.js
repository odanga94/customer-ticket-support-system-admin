import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Modal from '../../components/UI/Modal/Modal';
import CreateTicket from '../../containers/CreateTicket/CreateTicket';
import ticketsActionCreators from '../../store/actions/tickets';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return(
                { showSideDrawer: !prevState.showSideDrawer }
            )
        })
    }

    render(){
        return (
            <Aux>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler} 
                    plusIconClicked={this.props.createTicketHandler} 
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <main className={styles.Content}>
                    <Modal 
                        show={this.props.showAddTicketForm} 
                        modalClosed={this.props.removeTicket}
                    >
                        <CreateTicket remove={this.props.removeTicket}/>
                    </Modal>
                    {this.props.children}
                </main>
            </Aux>
        );   
    }
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return{
        createTicketHandler: () => dispatch(ticketsActionCreators.createTicket())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);