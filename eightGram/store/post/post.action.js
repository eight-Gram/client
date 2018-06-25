import axios from 'axios';
import { Alert } from 'react-native'

export const getAllPosts = () => {
    return dispatch => {
        dispatch(loadingData())
        axios.get('http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/post/')
        .then(function(postData) {
            dispatch(setPosts(postData.data.postData))
            dispatch(loadingDataDone())
        })
        .catch(function(err) {
            console.log(err)
        })
    }
}

export const addPost = (postData) => {
    console.log(postData)
    return dispatch => {
        axios.post('http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/post/', 
            postData.data, {
            headers: {
                token: postData.token,
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            console.log(response)
            dispatch(resetUpload())
            dispatch(getAllPosts())
        })
        .catch(function(err) {
            Alert.alert('Error', 'Something went wrong when uploading! Please try again!')
        })
    }
}

export const likePost = (postData) => {
    return dispatch => {
        console.log(postData.id)
        axios.put(`http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/post/like/${postData.id}`, {}, {
            headers: { token: postData.token }
        })
        .then(function(response) {
            dispatch(getAllPosts())
        })
        .catch(function(err) {
            Alert.alert('Error', 'Error when liking a post')
        })
    }
}

export const unlikePost = (postData) => {
    return dispatch => {
        axios.put(`http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/post/unlike/${postData.id}`, {}, {
            headers: { token: postData.token }
        })
        .then(function(response) {
            dispatch(getAllPosts())
        })
        .catch(function(err) {
            Alert.alert('Error', 'Error when unlike a post')
        })
    }
}

export const addComment = (postData) => {
    return dispatch => {
        axios.post(`http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/post/comment/${[postData.id]}`, {
            commentText: postData.comment_text
        }, {
            headers: { token: postData.token }
        })
        .then(function(response) {
            dispatch(getAllPosts())
            Alert.alert('Success', response.data.message)
        })
        .catch(function(err) {
            Alert.alert('Error', 'Error while posting comment. Try again!')
            console.log(err)
        })
    }
}

export const setImageInStore = (imageData) => ({
    type: 'SET_IMAGE',
    payload: imageData
})

export const setPostId = (postId) => ({
    type: 'SET_POST_ID',
    payload: postId
})

const setPosts = (postData) => ({
    type: 'SET_POST',
    payload: postData
})

const resetUpload = () => ({
    type: 'RESET_UPLOAD'
})

const loadingData = () => ({
    type: 'LOADING_DATA'
})

const loadingDataDone = () => ({
    type: 'LOADING_DATA_DONE'
})