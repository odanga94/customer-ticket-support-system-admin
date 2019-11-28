import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-global';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import PriorityColor from '../../components/PriorityColor/PriorityColor';
import styles from './MyTickets.module.css';
import ticketActionCreators from '../../store/actions/tickets'


class MyTickets extends Component {
    componentDidMount(){
        this.props.fetchTickets(this.props.token, this.props.userId)
    }

    /*componentDidUpdate(prevProps, prevState){
        if (this.props.token !== null && prevProps.token !== this.props.token){
            console.log(this.props.token, this.props.userId);
            this.props.fetchTickets(this.props.token, this.props.userId)
        }
    }*/

    createData = (index, dateCreated, category, subject, priority, status) => {
        return { index, dateCreated, category, subject, priority, status };
    }

    getTicketRefNo = (index) => {
        const modifiedIndex = index + 1
        if (modifiedIndex < 10){
            return 'HEN00' + modifiedIndex
        } else if(modifiedIndex < 99){
            return 'HEN0' + modifiedIndex
        } else{
            return 'HEN' + modifiedIndex
        }
    }


    render(){
        let ticketInfo = ['dateCreated', 'category', 'subject', 'priority', 'status'];
        return(
            this.props.loading ? <Spinner/> : this.props.tickets.length > 0 ?
            <div style={{margin: "10% 5%"}}>
                <h1 style={{textAlign: "left"}}>My Tickets</h1>
                <table className={styles.Table}>
                    <colgroup span="6"></colgroup>
                    <tbody>
                        <tr>
                            <th>Reference No.</th>
                            <th>Date Created</th>
                            <th>Category</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Status</th>
                        </tr>
                        {
                            this.props.tickets.map((ticket, index) => {
                                let ticketData = ticketInfo.map((identifier) => {
                                    if(identifier === 'priority'){
                                        return (
                                            <td key={identifier}>
                                                <PriorityColor priority={ticket[identifier]} /> 
                                                {ticket[identifier]}
                                            </td>
                                        )
                                    }
                                    return <td key={identifier}>{ticket[identifier]}</td>
                                })
                                return(
                                    <tr className={styles.dataRow} key={index} onClick={() => {this.props.goToTicket(ticket.id, this.getTicketRefNo(index))}}>
                                        <td>{this.getTicketRefNo(index)}</td>
                                        {ticketData}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div> : <p>You have not submitted any tickets yet!</p>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTickets: (token, userId) => dispatch(ticketActionCreators.fetchTickets(token, userId)) 
    }
}

const mapStateToProps = state => {
    return {
        loading: state.tickets.loading,
        tickets: state.tickets.tickets,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MyTickets, axios));