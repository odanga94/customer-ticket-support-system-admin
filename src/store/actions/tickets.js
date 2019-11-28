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

const postTicketStart = () => {
    return {
        type: actionTypes.POST_TICKET_START
    }
}

const postTicketSucceeded = (id, tickets) => {
    return {
        type: actionTypes.POST_TICKET_SUCCEEDED,
        tickets: tickets,
        ticketId: id
    }
}

const postTicketFailed = error => {
    return {
        type: actionTypes.POST_TICKET_FAILED,
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

export default {
    createTicket: () => {
        return {
            type: actionTypes.CREATE_TICKET
        }
    },
    removeTicket: () => {
        return {
            type: actionTypes.REMOVE_TICKET
        }
    },
    fetchTickets: (token, userId) => {
        return dispatch => {
            dispatch(fetchTicketsStart());
            const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
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
                //console.log(fetchedTickets);
                dispatch(fetchTicketsSucceeded(fetchedTickets));
            }).catch(err => {
                dispatch(fetchTicketsFailed(err))
            })
        }
    },
    postTicket: (ticket, token) => {
        return dispatch => {
            dispatch(postTicketStart());
            axios.post('./pendingTickets.json?auth=' + token, ticket)
            .then((response) => {
                console.log(response);
                dispatch(postTicketSucceeded(response.data.name, ticket));
            }).catch(error => {
                console.log(error);
                dispatch(postTicketFailed());
            });
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

    fetchReplies: (token, ticketId) => {
        return dispatch => {
            dispatch(fetchRepliesStart());
            const queryParams = '?auth=' + token;
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
        }
    }
}