import axios from 'axios'

export const getAllPosts = () => {
    return dispatch => {
        axios.get('http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/post/')
        .then(function(postData) {
            dispatch(setPosts(postData))
        })
        .catch(function(err) {
            console.log(err)
        })
    }
}

const setPosts = (postData) => ({
    type: 'SET_POST',
    payload: postData
})