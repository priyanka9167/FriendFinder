import { call, put } from 'redux-saga/effects';
import { doADDUserDetails, doFetchErrorUser } from '../action-initiators/simpleAction';
import { userData } from '../services/User/userData';

function* handleUserDetails(action) {
    const { query, header } = action;
    console.log("saga user console", query, header, action)
    try {
        const response = yield call(userData, `/api/users/getUserData/${query}`, header);
        console.log("saga response", response);
        if (response.data.StatusCode === '0') {
            yield put(doADDUserDetails(action.authuser,response?.data?.results?.rows[0]));
          
        }
        else {
            yield put(doFetchErrorUser(response.data.msg))
        }

    }
    catch (error) {
        yield put(doFetchErrorUser(error));
    }

}

export {
    handleUserDetails
}