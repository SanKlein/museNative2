import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const searchReducer = (state = initialState.search, action) => {
  switch(action.type) {
    case ActionTypes.CHANGE_SEARCH:
      return action.search

    default:
      return state
  }
}

export default searchReducer
