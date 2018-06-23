import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import userReducer from './user/user.reducer'
import postReducer from './post/post.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

export default store;