/*
入口js
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from './redux/lib/react-redux'

import App from './containers/App'
import store from './redux/store'
/**
 * Provider组件怎么渲染APP呢?
 *  标签体的所有子节点会成为外部组件标签的children属性
 */
ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))

