import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import axios from '../../axios-global';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import NewReply from '../NewReply/NewReply';
import Reply from '../../components/Reply/Reply';
import ticketActionCreators from '../../store/actions/tickets';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import Aux from '../../hoc/Aux';
import './FullTicket.css';

class FullTicket extends Component {

    state = {
        loadedTicket: null,
    }

    componentDidMount(){
        console.log(this.props);
        this.loadData(this.props.token, this.props.userId);
        this.props.fetchReplies(this.props.token, this.props.match.params.ticketId, this.props.location.state.status)
    }

    componentDidUpdate(){
        /*console.log(this.props);
        this.loadData(this.props.token, this.props.userId); */
        
    }

    loadData = (token, userId) => {
        if(!this.state.loadedTicket || (this.state.loadedTicket && this.state.loadedTicket.id !== +this.props.match.params.ticketId)){
            const queryParams = '?auth=' + token;
            if (this.props.location.state.status === "pending"){
                axios.get('/pendingTickets/' + this.props.match.params.ticketId + '.json' + queryParams)
                .then((response) => {
                    //console.log(response);
                    this.setState({
                        loadedTicket: {
                            ...response.data,
                            id: this.props.match.params.ticketId
                        }
                    }); 
                });
            } else {
                axios.get('/finalizedTickets/' + this.props.match.params.ticketId + '.json' + queryParams)
                .then((response) => {
                    //console.log(response);
                    this.setState({
                        loadedTicket: {
                            ...response.data,
                            id: this.props.match.params.ticketId
                        }
                    }); 
                });
            }
            
        }  
    }

    handleDialogOpen = () => {
        this.props.toggleDialog(true)
    }

    handleDialogClose = () => {
        this.props.toggleDialog(false)
    }

    handleFinalizeTicket = () => {
        this.props.finalizeTicket(this.props.token, this.state.loadedTicket.id, this.state.loadedTicket);
    }

    render () {
        let redirect = null
        let post = <Spinner/>
        if (this.state.loadedTicket) {
            const replies = this.props.fetchRepliesLoading ? <Spinner/> : this.props.replies.map(reply => <Reply reply={reply} key={reply.timestamp} />)
            post = (
                <div className="FullTicket">
                    <h1 style={{textAlign: "left", marginLeft: 5, marginBottom: -30}}>{this.props.location.state.ticketRefNo}</h1>
                    <div className="Header">
                        <h4 style={{textAlign: "left", color: "#505050"}}>{"Created: " + this.state.loadedTicket.dateCreated}</h4>
                        <h4 style={{textAlign: "right", color: "#505050"}}>{"Status: " + this.state.loadedTicket.status}</h4>
                    </div>
                    <h2>{this.state.loadedTicket.subject}</h2>
                    <p>{this.state.loadedTicket.description}</p>
                    <div style={{backgroundColor: "#f9f9f9", paddingBottom: 10}}>
                        <h2>Replies ({this.props.replies.length})</h2>
                        {replies}
                        {this.state.loadedTicket.status === "pending" ? <NewReply ticketId={this.state.loadedTicket.id} openDialog={this.handleDialogOpen}/> : null}
                    </div>
                    <AlertDialog open={this.props.dialogOpen} closeDialog={this.handleDialogClose} loading={this.props.finalizeTicketLoading} finalizeTicket={this.handleFinalizeTicket}/>
                </div>
    
            );
        }
        if (this.props.finalized){
            redirect = <Redirect to="/" />
        }
        return (
            <Aux>
                {redirect}
                {post}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        replies: state.tickets.replies,
        fetchRepliesLoading: state.tickets.fetchRepliesLoading,
        finalizeTicketLoading: state.tickets.finalizeTicketLoading,
        dialogOpen: state.tickets.dialogOpen,
        finalized: state.tickets.finalized
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReplies: (token, ticketId, status) => dispatch(ticketActionCreators.fetchReplies(token, ticketId, status)),
        finalizeTicket: (token, ticketId, ticket) => dispatch(ticketActionCreators.finalizeTicket(token, ticketId, ticket)),
        toggleDialog: (bool) => dispatch(ticketActionCreators.toggleDialogOpen(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FullTicket, axios));