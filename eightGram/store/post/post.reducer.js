const initialState = {
    posts: [],
}

const post = (state = {...initialState}, action) => {
    switch(action.type) {
        case 'SET_POST' : {
            return ({ ...state, post: action.payload })
        }
        default:
            return state;
    }
}

export default post