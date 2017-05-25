import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const listTitleReducer = (state = initialState.listTitle, action) => {
  switch(action.type) {

    case ActionTypes.LOAD_LIST_TITLE:
      return action.listTitle

    default:
      return state
  }
}

export default listTitleReducer
