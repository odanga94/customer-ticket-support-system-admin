import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import MyTickets from '../MyTickets/MyTickets';
import axios from '../../axios-global';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class TicketSystem extends Component {
    componentDidMount(){
        //console.log(this.props)
    }

    goToFullTicket = (ticketId, ticketRefNo, status) => {
        //console.log(ticketId);
        this.props.history.push("/" + ticketId, {ticketRefNo, status})
    }
    
    render(){
        return (
            <Aux>
                <MyTickets goToTicket={this.goToFullTicket}/>
            </Aux>
        );
    }
}


export default withErrorHandler(TicketSystem, axios);