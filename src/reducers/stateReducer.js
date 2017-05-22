import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const startedReducer = (state = initialState.state, action) => {
  switch(action.type) {

    case ActionTypes.LOAD_LOGIN:
      return 'login'

    case ActionTypes.START_APP:
      return 'started'

    case ActionTypes.CANCEL_LOGIN:
      return 'home'

    case ActionTypes.CANCEL_START:
      return 'home'

    case ActionTypes.SIGNUP_USER_SUCCESS:
      return 'started'

    case ActionTypes.LOGIN_USER_SUCCESS:
      return 'started'

    case ActionTypes.LOGOUT:
      return 'home'

    default:
      return state
  }
}

export default startedReducer
