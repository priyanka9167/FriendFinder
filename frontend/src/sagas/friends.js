import { call, put } from 'redux-saga/effects';
import { addUserFriendStatus, doFetchFriendStatusError } from '../action-initiators/simpleAction';
import { userFriendStatus } from '../services/User/userData';

function* handleUserFriendsDetails(action) {
    const { params, header } = action;
    console.log("saga friend console", params, header, action)
    try {
        const response = yield call(userFriendStatus, '/api/users/getUserFriendStatus',{params},header);
       
        console.log("saga response friends", response);
        if (response.data.StatusCode === '0') {
            console.log("already friend")
            yield put(addUserFriendStatus(true))
        }
        else if(response.data.StatusCode === '1') 
        {
            console.log("not friend")
            yield put(addUserFriendStatus(false))
            
        }
        else{
            yield put(doFetchFriendStatusError(response.data.msg))
        }

    }
    catch (error) {
        console.log(error)
    }

}

export {
    handleUserFriendsDetails
}