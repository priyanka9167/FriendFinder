import { call, put } from 'redux-saga/effects';
import { doFetchErrorUser, doAddAuthUserDetails } from '../action-initiators/simpleAction';
import { userDataUsingId, userDataUsingUsername } from '../services/User/userData';

function* handleAuthUserDetails(action) {
    const { query, header } = action;
    const url = query.id ? `/api/users/getUserDataUsingId/${query.id}` : `/api/users/getUserDataUsingUsername/${query.username}`
    console.log("authuser saga", url);
    try {
        if (query.id) {
            const response = yield call(userDataUsingId, url, header);
            console.log("saga response", response);
            if (response.data.StatusCode === '0') {
                yield put(doAddAuthUserDetails(action.authuser, response?.data?.results?.rows[0]));

            }
            else {
                yield put(doFetchErrorUser(response.data.msg))
            }
        }
        else {
            const response = yield call(userDataUsingUsername, url, header);
            console.log("saga response", response);
            if (response.data.StatusCode === '0') {
                yield put(doAddAuthUserDetails(action.authuser, response?.data?.results?.rows[0]));

            }
            else {
                yield put(doFetchErrorUser(response.data.msg))
            }
        }


    }
    catch (error) {
        yield put(doFetchErrorUser(error));
    }

}

export {
    handleAuthUserDetails
}