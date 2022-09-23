import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doFetchUserFriendStatus , doFetchFriendStatusError } from '../../action-initiators/simpleAction';
import { getFriendStatus, getFriendStatusError } from '../../selectors/friends';
import { getUserDetails } from '../../selectors/user';
import { headerToken } from '../Firebase';

export const useFriends = () => {


    const {authuser_details, user_details} = useSelector(state => getUserDetails(state));
    const status = useSelector(state => getFriendStatus(state));
    const error = useSelector(state => getFriendStatusError(state));

    const dispatch = useDispatch();


    const getFriendsDetails = useCallback(async (auth_id,user_id) => {
        try {
            const header = await headerToken();

            // const auth_id = authuser_details.id;
            // const user_id = user_details.id;
           
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
        
        if (authuser_details && user_details) {
            getFriendsDetails(authuser_details.id,user_details.id);
        }
    }, [authuser_details, user_details])

    return status;

}