const initialState = {
    posts: [],
    imageUrl: 'No Image',
    image: ''
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
        default:
            return state;
    }
}

export default post