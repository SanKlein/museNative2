import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const loadingReducer = (state = initialState.loading, action) => {
  switch(action.type) {
    case ActionTypes.SIGNUP_USER_REQUEST:
      return true

    case ActionTypes.SIGNUP_USER_SUCCESS:
      return false

    case ActionTypes.SIGNUP_USER_FAIL:
      return false

    case ActionTypes.LOGIN_USER_REQUEST:
      return true

    case ActionTypes.LOGIN_USER_SUCCESS:
      return false

    case ActionTypes.LOGIN_USER_FAIL:
      return false

    case ActionTypes.SET_LOADING:
      return true

    case ActionTypes.LOAD_APPROVED_PROMPTS_SUCCESS:
      return false

    case ActionTypes.SAVE_EDIT_USER_REQUEST:
      return true

    case ActionTypes.SAVE_EDIT_USER_FAIL:
      return false

    case ActionTypes.SAVE_EDIT_USER_SUCCESS:
      return false

    case ActionTypes.CHANGE_LOGIN_STATE:
      return false

    case ActionTypes.CHANGE_LOGIN_NAME:
      return false

    case ActionTypes.CHANGE_LOGIN_EMAIL:
      return false

    case ActionTypes.CHANGE_LOGIN_PASSWORD:
      return false

    case ActionTypes.CLEAR_LOGIN:
      return false

    case ActionTypes.LOAD_LOGIN:
      return false

    case ActionTypes.CANCEL_LOGIN:
      return false

    default:
      return state
  }
}

export default loadingReducer
