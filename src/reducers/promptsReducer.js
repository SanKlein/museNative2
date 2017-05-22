import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const promptsReducer = (state = initialState.prompts, action) => {
  switch(action.type) {

    case ActionTypes.SIGNUP_USER_SUCCESS:
      let signupPrompts = state.slice()
      signupPrompts.forEach(prompt => {
        if (prompt.user_id === action.user._id) {
          prompt.user_name = action.user.name
        }
      })
      return signupPrompts

    case ActionTypes.LOGIN_USER_SUCCESS:
      let loginPrompts = state.slice()
      loginPrompts.forEach(prompt => {
        if (prompt.user_id === action.user.old_id) {
          prompt.user_id = action.user._id
          prompt.user_name = action.user.name
        }
      })
      return loginPrompts

    case ActionTypes.DELETE_PROMPT:
      let deletePromptIndex = state.findIndex(prompt => prompt._id === action.prompt_id)
      return deletePromptIndex === -1 ? state : [ ...state.slice(0, deletePromptIndex), ...state.slice(deletePromptIndex + 1) ]

    case ActionTypes.APPROVE_NEW_PROMPT:
      let approveNewPromptIndex = state.findIndex(prompt => prompt._id === action.prompt._id)
      return approveNewPromptIndex === -1 ? [...state, action.prompt] : state

    case ActionTypes.LOAD_APPROVED_PROMPTS_SUCCESS:
      return action.prompts

    default:
      return state
  }
}

export default promptsReducer
