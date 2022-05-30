import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doFetchUserFriendStatus , doFetchFriendStatusError } from '../../action-initiators/simpleAction';
import { userFriendStatus } from '../../services/User/userData';
import { headerToken } from '../Firebase';

export const useFriends = (auth, user) => {

    const dispatch = useDispatch();

    const getFriendsDetails = useCallback(async (auth_id, user_id) => {
        try {
            const header = await headerToken();

            if (auth_id !== user_id) {
                const params = {
                    auth_id: auth_id,
                    user_id: user_id
                }

                dispatch(doFetchUserFriendStatus(params, header));
            }
        }
        catch (error) {
            dispatch(doFetchFriendStatusError(error));
        }
    }, [])

    useEffect(() => {
        if (auth && user) {
            getFriendsDetails(auth.uid, user.id);
        }
    }, [auth, user])

}