import { ADD_FRIEND_STATUS, FETCH_FRIEND_STATUS_ERROR } from "../components/constants/actionTypes";

export const userInitialFriendStatus = {
    status:null,
    error:null
};



const applyAddFriendStatus = (state,action) => ({
 
    ...state,
    status:action.status,
   error:null
});

const applyFetchErrorFriend = (state,action) => ({
    ...state,
    status:null,
   error:action.error
})


function friendReducer(state = userInitialFriendStatus, action) {
    console.log("action in reducers-friend", action)
    switch (action.type) {
        case ADD_FRIEND_STATUS: {
            return applyAddFriendStatus(state, action)
        }
       case FETCH_FRIEND_STATUS_ERROR: {
            return applyFetchErrorFriend(state,action)
        }

        default:
            return state
    }
};

export default friendReducer 