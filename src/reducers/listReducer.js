import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const listReducer = (state = initialState.list, action) => {
  switch(action.type) {

    case ActionTypes.LOAD_LIST:
      return action.list

    case ActionTypes.LOAD_CATEGORY:
      return initialState.list

    default:
      return state
  }
}

export default listReducer
