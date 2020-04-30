import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { trades, login } from './reducer'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const initStore = () => {
  return createStore(
    combineReducers({
      trades,
      login
    }),
    bindMiddleware([thunkMiddleware])
  )
}

const empty = () => {
  return (<></>)
}
export default empty