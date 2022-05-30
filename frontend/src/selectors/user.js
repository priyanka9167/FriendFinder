

const getUserDetails = ({ userState }) =>
{
   let authuser = userState.authuser;
   let user_details = userState.user_details;
    return {authuser,user_details}
}

  
const getFetchError = ({ userState }) =>
    userState.error


export { getUserDetails, getFetchError }    