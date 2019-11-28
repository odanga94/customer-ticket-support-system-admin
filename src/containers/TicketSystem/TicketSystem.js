import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import MyTickets from '../MyTickets/MyTickets';
import axios from '../../axios-global';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import profileActionCreators from '../../store/actions/profile'




class TicketSystem extends Component {
    componentDidMount(){
        //console.log(this.props)
    }

    goToFullTicket = (ticketId, ticketRefNo) => {
        //console.log(ticketId);
        this.props.history.push("/" + ticketId, {ticketRefNo})
    }
    
    render(){
        /*let redirect = null;
        if (this.props.profile == null){
            this.props.switchToEditProfileMode();
            redirect = <Redirect to="/my-account" />
        }*/
        return (
            <Aux>
                <MyTickets goToTicket={this.goToFullTicket}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchToEditProfileMode: () => dispatch(profileActionCreators.switchToEditProfileMode())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TicketSystem, axios));