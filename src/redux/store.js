import {createStore,applyMiddleware} from 'redux'

import reducer from './reducers'

import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk))) // 创建store对象内部会第一次调用reducer()