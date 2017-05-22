import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const todayPromptReducer = (state = initialState.todayPrompt, action) => {
  switch(action.type) {

    case ActionTypes.LOAD_TODAY_PROMPT_SUCCESS:
      return action.prompt_id

    default:
      return state
  }
}

export default todayPromptReducer
