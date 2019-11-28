import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-global';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import NewReply from '../NewReply/NewReply';
import Reply from '../../components/Reply/Reply';
import ticketActionCreators from '../../store/actions/tickets';
import './FullTicket.css';

class FullTicket extends Component {

    state = {
        loadedTicket: null
    }

    componentDidMount(){
        console.log(this.props);
        this.loadData(this.props.token, this.props.userId);
        this.props.fetchReplies(this.props.token, this.props.match.params.ticketId)
    }

    componentDidUpdate(){
        /*console.log(this.props);
        this.loadData(this.props.token, this.props.userId); */
        
    }

    loadData = (token, userId) => {
        if(!this.state.loadedTicket || (this.state.loadedTicket && this.state.loadedTicket.id !== +this.props.match.params.ticketId)){
            const queryParams = '?auth=' + token;
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
        }  
    }

    render () {
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
                        <NewReply ticketId={this.state.loadedTicket.id}/>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        replies: state.tickets.replies,
        fetchRepliesLoading: state.tickets.fetchRepliesLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReplies: (token, ticketId) => dispatch(ticketActionCreators.fetchReplies(token, ticketId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FullTicket, axios));