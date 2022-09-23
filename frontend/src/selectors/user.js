

const getUserDetails = ({ userState }) =>
{
   let authuser = userState.authuser;
   let authuser_details = userState.authuser_details;
   let user_details = userState.user_details;
    return {authuser,user_details, authuser_details}
}

  
const getFetchError = ({ userState }) =>
    userState.error


export { getUserDetails, getFetchError }    