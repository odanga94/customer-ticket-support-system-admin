import actionTypes from './actionTypes';
import axios from '../../axios-global';

const fetchTicketsStart = () => {
    return {
        type: actionTypes.FETCH_TICKETS_START
    }
}

const fetchTicketsSucceeded = (tickets) => {
    return {
        type: actionTypes.FETCH_TICKETS_SUCCEEDED,
        tickets: tickets
    }
}

const fetchTicketsFailed = (error) => {
    return {
        type: actionTypes.FETCH_TICKETS_FAILED,
        error: error
    }
}


const addReplyStart = () => {
    return {
        type: actionTypes.ADD_REPLY_START
    }
}

const addReplySucceeded = (reply) => {
    return {
        type: actionTypes.ADD_REPLY_SUCCEEDED,
        reply
    }
}

const addReplyFailed = error => {
    return {
        type: actionTypes.ADD_REPLY_FAILED,
        error
    }
}

const fetchRepliesStart = () => {
    return {
        type: actionTypes.FETCH_REPLIES_START
    }
}

const fetchRepliesSucceeded = (replies) => {
    return {
        type: actionTypes.FETCH_REPLIES_SUCCEEDED,
        replies: replies
    }
}

const fetchRepliesFailed = (error) => {
    return {
        type: actionTypes.FETCH_REPLIES_FAILED,
        fetchRepliesError: error
    }
}

const finalizeTicketStart = () => {
    return {
        type: actionTypes.FINALIZE_TICKET_START
    }
}

const finalizeTicketSucceeded = (response) => {
    return {
        type: actionTypes.FINALIZE_TICKET_SUCCEEDED,
        response
    }
}

const finalizeTicketFailed = (error) => {
    return {
        type: actionTypes.FINALIZE_TICKET_FAILED,
        error
    }
}

export default {
    fetchTickets: (token) => {
        return dispatch => {
            dispatch(fetchTicketsStart());
            const queryParams = '?auth=' + token;
            axios.get('/pendingTickets.json' + queryParams)
            .then(res => {
                //console.log(res.data);
                const fetchedTickets = [];
                for (let key in res.data){
                    fetchedTickets.push({
                        ...res.data[key],
                        id: key
                    })
                }
                axios.get('/finalizedTickets.json' + queryParams)
                    .then(res => {
                        for (let key in res.data){
                            fetchedTickets.push({
                                ...res.data[key],
                                id: key
                            })
                        }
                        dispatch(fetchTicketsSucceeded(fetchedTickets));
                    }).catch(err => {
                        console.log(err);
                        dispatch(fetchTicketsFailed(err))
                    })
                //console.log(fetchedTickets);
            }).catch(err => {
                dispatch(fetchTicketsFailed(err))
            })
        }
    },

    addReply: (reply, token, ticketId) => {
        return dispatch => {
            dispatch(addReplyStart());
            axios.post(`./pendingTickets/${ticketId}/replies.json?auth=${token}`, reply)
                .then(response => {
                    console.log(response);
                    dispatch(addReplySucceeded(reply));
                }).catch(error => {
                    console.log(error);
                    dispatch(addReplyFailed(error));
                });

        }
    },

    fetchReplies: (token, ticketId, status) => {
        return dispatch => {
            dispatch(fetchRepliesStart());
            const queryParams = '?auth=' + token;
            if (status === "pending"){
                axios.get(`/pendingTickets/${ticketId}/replies.json` + queryParams)
                    .then(res => {
                        console.log(res.data);
                        const fetchedReplies = [];
                        for (let key in res.data){
                            fetchedReplies.push({
                                ...res.data[key],
                                replyId: key
                            })
                        }
                        //console.log(fetchedTickets);
                        dispatch(fetchRepliesSucceeded(fetchedReplies));
                    }).catch(err => {
                        dispatch(fetchRepliesFailed(err))
                    })
            } else {
                axios.get(`/finalizedTickets/${ticketId}/replies.json` + queryParams)
                    .then(res => {
                        console.log(res.data);
                        const fetchedReplies = [];
                        for (let key in res.data){
                            fetchedReplies.push({
                                ...res.data[key],
                                replyId: key
                            })
                        }
                        //console.log(fetchedTickets);
                        dispatch(fetchRepliesSucceeded(fetchedReplies));
                    }).catch(err => {
                        dispatch(fetchRepliesFailed(err))
                    })
            }
            
        }
    },

    finalizeTicket: (token, ticketId, ticket) => {
        return dispatch => {
            dispatch(finalizeTicketStart());
            const updatedTicket = {
                ...ticket,
                status: "finalized"
            }
            axios.put(`/finalizedTickets/${ticketId}/.json?auth=${token}`, updatedTicket)
                .then(res => {
                    console.log(res);
                    axios.delete(`/pendingTickets/${ticketId}.json?auth=${token}`)
                        .then(res => {
                            console.log(res.data);
                            dispatch(finalizeTicketSucceeded(res.data));
                        }).catch(err => {
                            console.log(err);
                            dispatch(finalizeTicketFailed(err));
                        })
                    
                }).catch(err => {
                    console.log(err);
                    dispatch(finalizeTicketFailed(err))
                }) 
        }
    },

    toggleDialogOpen: (bool) => {
        return {
            type: actionTypes.TOGGLE_DIALOG_OPEN,
            open: bool
        }
    }
}