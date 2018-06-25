const initialState = {
    posts: [],
    imageUrl: 'No Image',
    image: '',
    loading: false,
    postId: ''
}

const post = (state = {...initialState}, action) => {
    switch(action.type) {
        case 'SET_POST' : {
            return ({ ...state, posts: action.payload })
        }
        case 'SET_IMAGE' : {
            return ({ ...state, 
                imageUrl: action.payload.url, 
                image: action.payload.data})
        }
        case 'RESET_UPLOAD': {
            return ({
                ...state,
                imageUrl: 'No Image',
                image: ''
            })
        }
        case 'LOADING_DATA': {
            return ({ ...state, loading: true })
        }
        case 'LOADING_DATA_DONE': {
            return({ ...state, loading: false })
        }
        case 'SET_POST_ID': {
            return ({...state, postId:action.payload})
        }
        default:
            return state;
    }
}

export default post