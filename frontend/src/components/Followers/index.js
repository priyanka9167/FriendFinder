import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../selectors/user';
import { headerToken } from '../Firebase';
import { getFollowersCount } from '../../services/User/userData';

export const useFollowers = () => { 

    const[count,setCount] = useState();
    const[error,setError] = useState(null);

    const { authuser_details } = useSelector(state => getUserDetails(state));
    console.log("enter followers", authuser_details)

    const getFollowers = useCallback(async () => {
        try {
            const header = await headerToken();
            if (authuser_details) {
                const response = await getFollowersCount(`/api/users/getFollowerCount/${authuser_details.id}`, header);
               if(response.data.StatusCode === "0")
               {
                setCount(response.data.results.rows[0].count);
                setError(null);
               }
               else{
                setCount(null);
                setError(response.data.msg);
               }

            }
        }
        catch (error) {
            setCount(null);
                setError(error); 
        }
    }, [])

    useEffect(() => {
        let didCancel = false;
        getFollowers();
        return () => {
            didCancel = true;
        };

    }, [getFollowers]);

    if(!error)
    {
        return count;
    }
    else{
        return error;
    }
}