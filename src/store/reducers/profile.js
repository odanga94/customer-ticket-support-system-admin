import actionTypes from '../actions/actionTypes';

const initialState = {
    profile: null,
    fetchProcessLoading: false,
    postProcessLoading: false,
    posted: false,
    error: null,
    editProfileMode: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.EDIT_PROFILE_START:
            return {
                ...state,
                postProcessLoading: true,
            }
        case actionTypes.EDIT_PROFILE_SUCCEEDED:
            return {
                ...state,
                postProcessLoading: false,
                profile: action.profile,
                posted: true
            }
        case actionTypes.EDIT_PROFILE_FAILED:
            return {
                ...state,
                postProcessLoading: false,
                error: action.error
            }
        case actionTypes.SWITCH_TO_EDIT_PROFILE_MODE:
            return {
                ...state,
                editProfileMode: true
            }
        case actionTypes.CANCEL_EDIT_PROFILE_MODE:
            return {
                ...state,
                editProfileMode: false
            }
        case actionTypes.CLOSE_MESSAGE:
            return {
                ...state,
                posted: false,
                error: null
            }
        case actionTypes.FETCH_PROFILE_START: {
            return {
                ...state,
                fetchProcessLoading: true
            }
        }
        case actionTypes.FETCH_PROFILE_SUCCEEDED: {
            return {
                ...state,
                profile: action.profile,
                fetchProcessLoading: false
            }
        }
        case actionTypes.FETCH_PROFILE_FAILED: {
            return {
                ...state,
                error: action.error,
                fetchProcessLoading: false
            }
        }
        default:
            return state
               
    }
}

export default reducer;