import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = () => {
    const reducer = combineReducers({
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    })
    const store = createStore(reducer, composeWithDevTools())
    return store
}

export default store