import ActionTypes from './actionTypes'
import { checkOffline } from './offlineActions'

export const handleErrors = (response) => {
  if (response.status !== 200) {
    throw Error(response.statusText)
  }
  return response.json()
}

// create user
export const createUser = (user) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.CREATE_USER_REQUEST, user })  // send create user request

  return fetch(ActionTypes.URL + '/api/user/create', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.CREATE_USER_FAIL, error: 'Failed to create new user' }))
}

// export const addLife = () => (dispatch) => {
//   return axios.post('api/changeLife')
// }

// logout user
export const logout = () => ({ type: ActionTypes.LOGOUT })

// load user prompts
export const loadUser = (_id) => (dispatch, getState) => {
  return fetch(ActionTypes.URL + '/api/user', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ _id }) })
    .then(handleErrors)
    .then(responseJson => {
      dispatch({ type: ActionTypes.LOAD_USER_SUCCESS, user: responseJson })
      checkOffline(dispatch, getState)
    })
    .catch(error => console.log('Failed to load user'))
}

export const loadUserAnswers = (_id) => (dispatch, getState) => {
  return fetch(ActionTypes.URL + '/api/user/answers', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ _id }) })
    .then(handleErrors)
    .then(responseJson => {
      dispatch({ type: ActionTypes.LOAD_USER_ANSWERS_SUCCESS, answers: responseJson.answers })
      checkOffline(dispatch, getState)
    })
    .catch(error => console.log('Failed to load user answers'))
}

export const loadCategories = () => (dispatch, getState) => {
  return fetch(ActionTypes.URL + '/api/categories', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
    .then(handleErrors)
    .then(responseJson => {
      dispatch({ type: ActionTypes.LOAD_CATEGORIES_SUCCESS, categories: responseJson.categories })
      checkOffline(dispatch, getState)
    })
    .catch(error => console.log('Failed to load categories'))
}

export const startApp = () => ({ type: ActionTypes.START_APP })

export const cancelStart = () => ({ type: ActionTypes.CANCEL_START })

// update streak
export const updateStreak = (user_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.UPDATE_STREAK })

  return fetch(ActionTypes.URL + '/api/user/streak', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.UPDATE_STREAK_OFFLINE, user }))
}

// reset streak
export const resetStreak = (user_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.RESET_STREAK })

  return fetch(ActionTypes.URL + '/api/user/streak', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.RESET_STREAK_OFFLINE }))
}

export const editUser = (user) => ({ type: ActionTypes.EDIT_USER, user })

// change edit name
export const changeEditName = (name) => ({ type: ActionTypes.CHANGE_EDIT_USER_NAME, name })

// change edit email
export const changeEditEmail = (email) => ({ type: ActionTypes.CHANGE_EDIT_USER_EMAIL, email })

export const saveEditUser = (user) => (dispatch) => {
  dispatch({ type: ActionTypes.SAVE_EDIT_USER_REQUEST })

  return fetch(ActionTypes.URL + '/api/user/update', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user }) })
    .then(handleErrors)
    .then(responseJson => dispatch({ type: ActionTypes.SAVE_EDIT_USER_SUCCESS, user }))
    .catch(error => dispatch({ type: ActionTypes.SAVE_EDIT_USER_FAIL, error: 'Sorry, name or email is taken' }))
}

export const resetSeen = () => ({ type: ActionTypes.RESET_SEEN })
