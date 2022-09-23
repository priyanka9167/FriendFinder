import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, headerToken } from "../Firebase";
import { doFetchUserDetails, doRemoveUser, doFetchAuthUserDetails } from '../../action-initiators/simpleAction';
import { getUserDetails, getFetchError } from "../../selectors/user";

export const useAuthListener = () => {


    const { authuser, user_details } = useSelector(state => getUserDetails(state));
    console.log("use selector", authuser, user_details);
    const error = useSelector(state => getFetchError(state));
    const dispatch = useDispatch();



    const getUser = useCallback(async () => {
       
        try {
            let authuser = await checkUser();
            console.log("authenication authUser", authuser, user_details)
            if (authuser) {
                localStorage.setItem('setAuthUser', true);
                let id = authuser.uid;
            
                let header = await headerToken();
                dispatch(doFetchAuthUserDetails(authuser, {id:id},header));
                dispatch(doFetchUserDetails(authuser, {id:id}, header));

            }
            else {
                localStorage.setItem('setAuthUser', false);
                dispatch(doRemoveUser(null));

            }

        }
        catch (err) {
            console.log(err)
        }

    }, [])




    useEffect(() => {
        getUser();
    }, [getUser]);



    return { authuser, user_details, error }


}


