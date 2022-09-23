import { call, put } from 'redux-saga/effects';
import { doADDUserDetails, doFetchErrorUser } from '../action-initiators/simpleAction';
import { userDataUsingId, userDataUsingUsername } from '../services/User/userData';

function* handleUserDetails(action) {
    const { query, header } = action;
    console.log("user query",query)
    const url = query.id ? `/api/users/getUserDataUsingId/${query.id}` : `/api/users/getUserDataUsingUsername/${query.username}`;
    console.log("user saga", url);

    try {
        if (query.id) {
            const response = yield call(userDataUsingId, url, header);
            console.log("saga response", response);
            if (response.data.StatusCode === '0') {
                yield put(doADDUserDetails(action.authuser, response?.data?.results?.rows[0]));

            }
            else {
                yield put(doFetchErrorUser(response.data.msg))
            }
        }
        else {
            const response = yield call(userDataUsingUsername, url, header);
            console.log("saga response", response);
            if (response.data.StatusCode === '0') {
                yield put(doADDUserDetails(action.authuser, response?.data?.results?.rows[0]));

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
    handleUserDetails
}