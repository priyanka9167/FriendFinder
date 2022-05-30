import { SET_AUTHUSER, REMOVE_AUTHUSER } from "../components/constants/actionTypes";
const INITIAL_STATE = {
    authUser: null
};

const applySetAuthUser = (state, action) => ({
    ...state,
    authUser: action.authuser,
});

const applyRemoveAuthUser = (state,action) => ({
    ...state,
    authUser: null,
})

function sessionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_AUTHUSER: {
            console.log("reducers authuser", action)
            return applySetAuthUser(state, action);
        }
        case REMOVE_AUTHUSER:{
            return applyRemoveAuthUser(state,action);
        }
        default:
            return state;
    }
}

export default sessionReducer;