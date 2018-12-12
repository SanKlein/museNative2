import initialState from './initialState';
import ActionTypes from '../actions/actionTypes';

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOGIN_NAME:
      return { ...state, name: action.name };

    case ActionTypes.CHANGE_LOGIN_EMAIL:
      return { ...state, email: action.email };

    case ActionTypes.CHANGE_LOGIN_PASSWORD:
      return { ...state, password: action.password };

    case ActionTypes.CHANGE_LOGIN_STATE:
      return { ...state, login: action.login };

    case ActionTypes.CLEAR_LOGIN:
      return initialState.login;

    case ActionTypes.LOAD_LOGIN:
      return { ...state, login: !state.login };

    default:
      return state;
  }
};

export default loginReducer;
