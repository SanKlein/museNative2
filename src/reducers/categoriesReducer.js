import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const categoriesReducer = (state = initialState.categories, action) => {
  switch(action.type) {

    case ActionTypes.LOAD_CATEGORIES_SUCCESS:
      return action.categories

    default:
      return state
  }
}

export default categoriesReducer
