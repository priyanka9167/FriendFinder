const getFriendStatus = ({friendState}) => 

{
    console.log("inside selector to check ",friendState)
    return friendState.status;

}

const getFriendStatusError = ({friendState}) => friendState.error;

export {getFriendStatus,getFriendStatusError}