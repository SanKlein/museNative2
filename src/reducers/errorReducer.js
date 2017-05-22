import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const errorReducer = (state = initialState.error, action) => {
  switch(action.type) {

    case ActionTypes.CREATE_USER_FAIL:
      return action.error

    case ActionTypes.SET_ERROR:
      return action.error

    case ActionTypes.CLEAR_ERROR:
      return ''

    case ActionTypes.CHANGE_LOGIN_NAME:
      return ''

    case ActionTypes.CHANGE_LOGIN_EMAIL:
      return ''

    case ActionTypes.CHANGE_LOGIN_PASSWORD:
      return ''

    case ActionTypes.CHANGE_LOGIN_STATE:
      return ''

    case ActionTypes.SIGNUP_USER_REQUEST:
      return ''

    case ActionTypes.SIGNUP_USER_FAIL:
      return action.error

    case ActionTypes.LOGIN_USER_REQUEST:
      return ''

    case ActionTypes.LOGIN_USER_FAIL:
      return action.error

    case ActionTypes.CLEAR_LOGIN:
      return ''

    case ActionTypes.PICK_USER_CATEGORY:
      return ''

    case ActionTypes.CLEAR_NEW_PROMPT:
      return ''

    case ActionTypes.CHANGE_NEW_PROMPT_TITLE:
      return ''

    case ActionTypes.PICK_NEW_PROMPT_CATEGORY:
      return ''

    case ActionTypes.CHANGE_EDIT_USER_NAME:
      return ''

    case ActionTypes.CHANGE_EDIT_USER_EMAIL:
      return ''

    case ActionTypes.SAVE_EDIT_USER_REQUEST:
      return ''

    case ActionTypes.SAVE_EDIT_USER_FAIL:
      return action.error

    default:
      return state
  }
}

export default errorReducer
