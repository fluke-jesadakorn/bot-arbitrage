import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

const countActionTypes = {
  ADD: 'ADD',
}

const addCount = () => dispatch => {
  return dispatch({ type: countActionTypes.ADD })
}

const countInitialState = {
  count: 0,
}

const count = (state = countInitialState, action) => {
  switch (action.type) {
    case countActionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1,
      })
    default:
      return state
  }
}

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
      count,
    }),
    bindMiddleware([thunkMiddleware])
  )
}