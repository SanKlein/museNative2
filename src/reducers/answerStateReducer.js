import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const answerStateReducer = (state = initialState.answerState, action) => {
  switch(action.type) {

    case ActionTypes.SAVE_ANSWER:
      return 'saved'

    case ActionTypes.CHANGE_ANSWER_TEXT:
      return action.text ? 'changed' : 'none'

    case ActionTypes.LOAD_ANSWER:
      return 'none'

    case ActionTypes.CREATE_NEW_ANSWER:
      return 'none'

    default:
      return state
  }
}

export default answerStateReducer
