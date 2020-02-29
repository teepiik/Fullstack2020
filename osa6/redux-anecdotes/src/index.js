import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const storeFor = store()

ReactDOM.render(
    <Provider store={storeFor}>
        <App />
    </Provider>,
    document.getElementById('root')
)