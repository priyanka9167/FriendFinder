import axios from 'axios';

const local_url = 'http://localhost:5000';



const userRegistration = async (url, payload, header) => {
    console.log('url', `${local_url}${url}`, header, payload)
    try {
        let response = await axios.post(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
}

const userLoggedIn = async (url, payload, header) => {
    console.log('url', `${local_url}${url}`, header, payload)
    try {
        let response = await axios.post(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
}

const userData = async(url, header) => {
    console.log("userdata service", url, header)
    try{
        let response = await axios.get(`${local_url}${url}`,  header);
        return response
    }
    catch(err)
    {
        return err
    }
}

const updateUserProfile = async (url, payload, header) => {
    console.log('url', `${local_url}${url}`, header, payload)
    try {
        let response = await axios.post(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
}

const addUserFriend = async(url,payload,header) => {
    console.log('url', `${local_url}${url}`, header, payload)
    try {
        let response = await axios.post(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
}

const userFriendStatus = async(url,payload,header) => {
    console.log('url', `${local_url}${url}`, header, payload)
    try {
        let response = await axios.get(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
}

const getUserFriendList = async(url, header) => {
    console.log("userdata service", url, header)
    try{
        let response = await axios.get(`${local_url}${url}`,  header);
        return response
    }
    catch(err)
    {
        return err
    }
}

const removeUserFriends = async (url, header) => {
    console.log('url', `${local_url}${url}`, header)
    try {
        let response = await axios.delete(`${local_url}${url}`, header);
        return response
    }
    catch (err) {
        return err
    }
}

export { userRegistration, userLoggedIn, userData, updateUserProfile, addUserFriend, userFriendStatus, getUserFriendList, removeUserFriends}
