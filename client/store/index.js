import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import ticketsReducer from './ticket'

 const reducer = combineReducers({
    user, ticketsReducer
  })

  const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
  )

const store = createStore(reducer, middleware)

export default store

export * from './user'