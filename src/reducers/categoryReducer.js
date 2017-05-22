import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const categoryReducer = (state = initialState.category, action) => {
  switch(action.type) {

    case ActionTypes.LOAD_CATEGORY:
      return action.category

    case ActionTypes.LOAD_LIST:
      return initialState.category

    default:
      return state
  }
}

export default categoryReducer
