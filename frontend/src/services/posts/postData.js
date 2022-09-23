import axios from "axios";

const local_url = 'http://localhost:5000';


const PostData = async (url, payload, header) => {
    try {
        let response = await axios.post(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
}

const getUserPostData = async (url,  header) => {
    try {
        let response = await axios.get(`${local_url}${url}`, header);
        return response
    }
    catch (err) {
        return err
    }
}

const editPostWithID = async (url, payload, header) => {
    try {
        let response = await axios.post(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
}

const deletePostWithId = async (url, header) => {
    try {
        let response = await axios.delete(`${local_url}${url}`, header);
        return response
    }
    catch (err) {
        return err
    }
};

const likeUserPost = async (url, payload, header) => {
    try {
        let response = await axios.post(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
};

const getPostCounts = async (url,  header) => {
    try {
        let response = await axios.get(`${local_url}${url}`, header);
        return response
    }
    catch (err) {
        return err
    }
}

const removeLikesDislikesPost = async (url, payload, header) => {
    try {
        let response = await axios.put(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
}

const postComment = async (url, payload, header) => {
    try {
        let response = await axios.post(`${local_url}${url}`, payload, header);
        return response
    }
    catch (err) {
        return err
    }
};

const getPostComments = async (url,  header) => {
    try {
        let response = await axios.get(`${local_url}${url}`, header);
        return response
    }
    catch (err) {
        return err
    }
}

export {PostData, getUserPostData,editPostWithID, deletePostWithId, likeUserPost, getPostCounts, removeLikesDislikesPost, postComment, getPostComments}