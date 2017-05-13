// @flow

import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'

import helloReducer from '../shared/reducer/hello'
import notesReducer from '../shared/reducer/notes'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState && plainPartialState.hello) {
    // flow-disable-next-line
    preloadedState.hello = helloReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.hello))
  }

  if (plainPartialState && plainPartialState.notes) {
    // flow-disable-next-line
    preloadedState.notes = notesReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.notes))
  }

  return createStore(combineReducers({ hello: helloReducer, notes: notesReducer }),
    preloadedState, applyMiddleware(thunkMiddleware, apiMiddleware))
}

export default initStore
