import actionTypes from '../actions/actionTypes';

const initialState = {
    tickets: [],
    loading: false,
    addReplyLoading: false,
    replies: [],
    addReplyError: null,
    fetchRepliesError: null,
    fetchRepliesLoading: false,
    finalizeTicketLoading: false,
    finalizeTicketResponse: {},
    finalizeTicketError: null,
    dialogOpen: false,
    finalized: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TICKETS_START:
            return {
                ...state,
                loading: true,
                finalized: false
            }
        case actionTypes.FETCH_TICKETS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                tickets: action.tickets,
            }
        case actionTypes.FETCH_TICKETS_FAILED:
            return {
                ...state,
                loading: false
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
        case actionTypes.FINALIZE_TICKET_START:
            return {
                ...state,
                finalizeTicketLoading: true
            }
        case actionTypes.FINALIZE_TICKET_SUCCEEDED:
            return {
                ...state,
                finalizeTicketResponse: action.response,
                finalizeTicketLoading: false,
                dialogOpen: false,
                finalized: true
            }
        case actionTypes.FINALIZE_TICKET_FAILED:
            return {
                ...state,
                finalizeTicketError: action.error,
                finalizeTicketLoading: false,
                dialogOpen: false
            }
        case actionTypes.TOGGLE_DIALOG_OPEN:
            return {
                ...state,
                dialogOpen: action.open
            }
        default:
            return state;
    }
}

export default reducer;