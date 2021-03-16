import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import memoryUtil from "./utils/memoryUtil"
import localStorageUtil from "./utils/localstorageUtil"

//读取local中保存user，保存到内存中
const user = localStorageUtil.getUser()
memoryUtil.user = user

ReactDOM.render(


<BrowserRouter>
<App/>
</BrowserRouter>,
document.getElementById('root'))