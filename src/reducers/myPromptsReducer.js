import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const myPromptsReducer = (state = initialState.myPrompts, action) => {
  switch(action.type) {

    case ActionTypes.LOAD_USER_PROMPTS_SUCCESS:
      return action.prompts

    case ActionTypes.CREATE_NEW_PROMPT:
      return [ ...state, action.prompt ]

    case ActionTypes.DELETE_PROMPT:
      let deletePromptIndex = state.findIndex(prompt => prompt._id === action.prompt_id)
      return deletePromptIndex === -1 ? state : [ ...state.slice(0, deletePromptIndex), ...state.slice(deletePromptIndex + 1) ]

    case ActionTypes.SIGNUP_USER_SUCCESS:
      let signupPrompts = state.slice()
      signupPrompts.forEach(prompt => {
        prompt.user_name = action.user.name
      })
      return signupPrompts

    case ActionTypes.LOGIN_USER_SUCCESS:
      let loginPrompts = state.slice()
      loginPrompts.forEach(prompt => {
        prompt.user_id = action.user._id,
        prompt.user_name = action.user.name
      })
      return loginPrompts

    case ActionTypes.LOGOUT:
      return initialState.myPrompts

    default:
      return state
  }
}

export default myPromptsReducer
