import ActionTypes from './actionTypes';
import { loadUserAnswers } from './userActions';
import { loadUserPrompts } from './promptActions';
import { handleErrors } from './userActions';

// change login name
export const changeLoginName = name => ({ type: ActionTypes.CHANGE_LOGIN_NAME, name });

// change login email
export const changeLoginEmail = email => ({ type: ActionTypes.CHANGE_LOGIN_EMAIL, email });

// change login password
export const changeLoginPassword = password => ({
  type: ActionTypes.CHANGE_LOGIN_PASSWORD,
  password
});

// sign up user
export const signupUser = user => dispatch => {
  dispatch({ type: ActionTypes.SIGNUP_USER_REQUEST }); // send sign up user request

  return fetch(ActionTypes.URL + '/api/signup', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  })
    .then(handleErrors)
    .then(responseJson => dispatch({ type: ActionTypes.SIGNUP_USER_SUCCESS, user }))
    .catch(error =>
      dispatch({ type: ActionTypes.SIGNUP_USER_FAIL, error: 'Sorry, name or email is taken' })
    );
};

// login user
export const loginUser = user => dispatch => {
  dispatch({ type: ActionTypes.LOGIN_USER_REQUEST });

  return fetch(ActionTypes.URL + '/api/login', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  })
    .then(handleErrors)
    .then(responseJson => {
      dispatch({ type: ActionTypes.LOGIN_USER_SUCCESS, user: responseJson });
      dispatch(loadUserPrompts(responseJson));
      dispatch(loadUserAnswers(responseJson));
    })
    .catch(error =>
      dispatch({ type: ActionTypes.LOGIN_USER_FAIL, error: 'Sorry, password does not match' })
    );
};

// clear login
export const clearLogin = () => ({ type: ActionTypes.CLEAR_LOGIN });

// load login page
export const loadLogin = () => ({ type: ActionTypes.LOAD_LOGIN });
