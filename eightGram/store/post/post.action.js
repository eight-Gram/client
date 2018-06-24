import axios from 'axios';
import { Alert } from 'react-native'

export const getAllPosts = () => {
    return dispatch => {
        axios.get('http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/post/')
        .then(function(postData) {
            dispatch(setPosts(postData.data.postData))
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
            dispatch(resetUpload)
            dispatch(getAllPosts)
        })
        .catch(function(err) {
            Alert.alert('Error', 'Something went wrong when uploading! Please try again!')
            console.log(err.response)
        })
    }
}

export const setImageInStore = (imageData) => ({
    type: 'SET_IMAGE',
    payload: imageData
})

const setPosts = (postData) => ({
    type: 'SET_POST',
    payload: postData
})

const resetUpload = () => ({
    type: 'RESET_UPLOAD'
})
