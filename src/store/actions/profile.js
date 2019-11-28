import actionTypes from './actionTypes';
import axios from '../../axios-global';

const editProfileStart = () => {
    return {
        type: actionTypes.EDIT_PROFILE_START
    }
}

const editProfileSucceeded = (profile) => {
    return {
        type: actionTypes.EDIT_PROFILE_SUCCEEDED,
        profile
    }
}

const editProfileFailed = error => {
    return {
        type: actionTypes.EDIT_PROFILE_FAILED,
        error
    }
}

const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    }
}

const fetchProfileSucceeded = (profile) => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCEEDED,
        profile
    }
}

const fetchProfileFailed = error => {
    return {
        type: actionTypes.FETCH_PROFILE_FAILED,
        error
    }
}

export default {
    fetchProfile: (token, userId) => {
        return dispatch => {
            dispatch(fetchProfileStart());
            const queryParams = '?auth=' + token;
            axios.get(`/users/${userId}.json` + queryParams)
                .then(res => {
                    console.log(res.data);
                    dispatch(fetchProfileSucceeded(res.data))
                }).catch(err => {
                    dispatch(fetchProfileFailed(err));
                })
        }
    },
    editProfile: (profile, token, userId) => {
        return dispatch => {
            dispatch(editProfileStart());
            axios.put(`/users/${userId}.json?auth=` + token, profile)
                .then(response => {
                    console.log(response.data);
                    dispatch(editProfileSucceeded(profile))
                }).catch(err => {
                    console.log(err);
                    dispatch(editProfileFailed(err));
                })
        }
    },
    switchToEditProfileMode: () => {
        return {
            type: actionTypes.SWITCH_TO_EDIT_PROFILE_MODE
        }
    },
    cancelEditProfileMode: () => {
        return {
            type: actionTypes.CANCEL_EDIT_PROFILE_MODE
        }
    },
    closeMessage: () => {
        return {
            type: actionTypes.CLOSE_MESSAGE
        }
    }
}