import {takeEvery, all} from 'redux-saga/effects';
import { handleUserDetails } from './user';
import { handleUserFriendsDetails } from './friends';
import {handleAuthUserDetails} from './authuser';
import {USER_FETCH, FETCH_FRIENDS_STATUS, FETCH_AUTH_USER} from '../components/constants/actionTypes'

function* watchAll() {
    console.log("entered")
    yield all([
        takeEvery(USER_FETCH, handleUserDetails),
        takeEvery(FETCH_AUTH_USER,handleAuthUserDetails),
        takeEvery(FETCH_FRIENDS_STATUS,handleUserFriendsDetails)
    ])
}

export default watchAll