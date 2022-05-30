import {takeEvery, all} from 'redux-saga/effects';
import { handleUserDetails } from './user';
import { handleUserFriendsDetails } from './friends';
import {USER_FETCH, FETCH_FRIENDS_STATUS} from '../components/constants/actionTypes'

function* watchAll() {
    yield all([
        takeEvery(USER_FETCH, handleUserDetails),
        takeEvery(FETCH_FRIENDS_STATUS,handleUserFriendsDetails)
    ])
}

export default watchAll