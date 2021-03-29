import React from 'react'
import ReactDOM from 'react-dom'
// import {BrowserRouter} from 'react-router-dom'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App'
import memoryUtil from "./utils/memoryUtil"
import localStorageUtil from "./utils/localstorageUtil"
import store from './redux/store'


// //读取local中保存user，保存到内存中
// const user = localStorageUtil.getUser()
// memoryUtil.user = user

ReactDOM.render(

<Provider store={store}>
<HashRouter>
<App/>
</HashRouter>
</Provider>,
document.getElementById('root'))