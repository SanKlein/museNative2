import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'
import { AsyncStorage } from 'react-native'
import rootReducer from '../reducers'

const middlewares = [thunk]

const configStore = (initialStore) => {
  const store = createStore(rootReducer, initialStore, applyMiddleware(...middlewares))

  store.subscribe(throttle(() => {
    AsyncStorage.setItem('museStore', JSON.stringify(store.getState()))
    // AsyncStorage.setItem('museStore', JSON.stringify(initialStore))
  }, 1000))

  return store
}

export default configStore
