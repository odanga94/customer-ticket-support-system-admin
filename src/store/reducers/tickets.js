import actionTypes from '../actions/actionTypes';

const initialState = {
    createTicket: false,
    tickets: [],
    loading: false,
    postProcessLoading: false,
    posted: false,
    addReplyLoading: false,
    replies: [],
    addReplyError: null,
    fetchRepliesError: null,
    fetchRepliesLoading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TICKET:
            return {
                ...state,
                createTicket: true,
                posted: false
            }
        case actionTypes.REMOVE_TICKET:
            return {
                ...state,
                createTicket: false
            }
        case actionTypes.FETCH_TICKETS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_TICKETS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                tickets: action.tickets
            }
        case actionTypes.FETCH_TICKETS_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.POST_TICKET_START:
            return {
                ...state,
                postProcessLoading: true
            }
        case actionTypes.POST_TICKET_SUCCEEDED:
            const newTicket = {
                ...action.tickets,
                id: action.ticketId
            }

            return {
                ...state,
                postProcessLoading: false,
                posted: true,
                createTicket: false,
                tickets: state.tickets.concat(newTicket)
            }
        case actionTypes.POST_TICKET_FAILED:
            return {
                ...state,
                postProcessLoading: false
            }
        case actionTypes.ADD_REPLY_START:
            return {
                ...state,
                addReplyLoading: true
            }
        case actionTypes.ADD_REPLY_SUCCEEDED:
            return {
                ...state,
                replies: state.replies.concat(action.reply),
                addReplyLoading: false
            }
        case actionTypes.ADD_REPLY_FAILED:
            return {
                ...state,
                addReplyError: action.error,
                addReplyLoading: false
            }
        case actionTypes.FETCH_REPLIES_START:
            return {
                ...state,
                fetchRepliesLoading: true
            }
        case actionTypes.FETCH_REPLIES_SUCCEEDED:
            return {
                ...state,
                replies: action.replies,
                fetchRepliesLoading: false
            }
        case actionTypes.FETCH_REPLIES_FAILED:
            return {
                ...state,
                fetchRepliesError: action.fetchRepliesError,
                fetchRepliesLoading: false
            }
        default:
            return state;
    }
}

export default reducer;