import initialState from './initialState';
import ActionTypes from '../actions/actionTypes';

const editUserReducer = (state = initialState.editUser, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_EDIT_USER_NAME:
      return { ...state, name: action.name };

    case ActionTypes.CHANGE_EDIT_USER_EMAIL:
      return { ...state, email: action.email };

    case ActionTypes.EDIT_USER:
      return action.user;

    case ActionTypes.LOGOUT:
      return initialState.editUser;

    case ActionTypes.SIGNUP_USER_SUCCESS:
    case ActionTypes.LOAD_USER_SUCCESS:
    case ActionTypes.LOGIN_USER_SUCCESS:
      return { name: action.user.name, email: action.user.email };

    default:
      return state;
  }
};

export default editUserReducer;
