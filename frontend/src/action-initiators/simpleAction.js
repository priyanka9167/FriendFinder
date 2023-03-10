import { USER_ADD,USER_FETCH,FETCH_AUTH_USER,ADD_AUTHUSER_DETAILS, USER_FETCH_ERROR, REMOVE_USER, ADD_FRIEND_STATUS , FETCH_FRIENDS_STATUS,FETCH_FRIEND_STATUS_ERROR} from "../components/constants/actionTypes";

const doADDUserDetails = (authuser,details) => ({
  type: USER_ADD,
  authuser,
  details,
});

const doFetchAuthUserDetails = (authuser,query,header) => ({
  type: FETCH_AUTH_USER,
  authuser,
  query,
  header
})

const doAddAuthUserDetails = (authuser,authuser_details) => ({
  type: ADD_AUTHUSER_DETAILS,
  authuser,
  authuser_details,
})

const doFetchUserDetails = (authuser,query,header) => ({
  type: USER_FETCH,
  authuser,
  query,
  header
});

const doFetchErrorUser = error => ({
  type: USER_FETCH_ERROR,
  error,
});

const doRemoveUser = () => ({
  type: REMOVE_USER
});

const addUserFriendStatus = (status) => ({
  type: ADD_FRIEND_STATUS,
  status
});

const doFetchUserFriendStatus = (params,header) => ({
  type: FETCH_FRIENDS_STATUS,
  params,
  header
});

const doFetchFriendStatusError = (error) => ({
  type:FETCH_FRIEND_STATUS_ERROR,
  error
})




export {doADDUserDetails, doFetchUserDetails, doFetchAuthUserDetails,doAddAuthUserDetails,doFetchErrorUser, doRemoveUser, doFetchUserFriendStatus, addUserFriendStatus, doFetchFriendStatusError};
