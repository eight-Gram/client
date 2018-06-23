import axios from 'axios'

export const getUsers = (token) => {
    return dispatch => {
        axios.get('http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/user/', {
            headers: token
        })
        .then(function(userData) {
            dispatch(setUsers(userData))
        })
        .catch(function(err) {
            console.log(err)
        })
    }
}

const setUsers = (userData) => ({
    type: 'SET_USER',
    payload: userData
})