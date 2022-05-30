
import { USER_ADD, USER_FETCH_ERROR, REMOVE_USER } from "../components/constants/actionTypes";
export const userInitialState = {
    authuser:null,
    user_details: null,
    error: null
};

const applyAddUserDetails = (state, action) => ({
    ...state,
    authuser:action.authuser,
    user_details: action.details,
    error: null
});

const applyFetchErrorUser = (state, action) => ({
    ...state,
    authuser:null,
    user_details: null,
    error: action.error
});

const removeUser = (state,action) => ({
    ...state,
    authuser:null,
    user_details: null,
    error: null
})

function userReducer(state = userInitialState, action) {
    console.log("action in reducers-2", action)
    switch (action.type) {
        case USER_ADD: {
            return applyAddUserDetails(state, action)
        }
        case USER_FETCH_ERROR: {
            return applyFetchErrorUser(state, action)
        }
        case REMOVE_USER: {
            return removeUser()
        }

        default:
            return state
    }
}

export default userReducer