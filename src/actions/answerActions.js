import ActionTypes from './actionTypes'
import { handleErrors } from './userActions'
import { checkOffline } from './offlineActions'

// create new answer
export const createNewAnswer = (answer) => ({ type: ActionTypes.CREATE_NEW_ANSWER, answer })

// save answer text
export const saveAnswer = (answer) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.SAVE_ANSWER, answer })  // save answer

  return fetch(ActionTypes.URL + '/api/answer/save', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ answer }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.SAVE_ANSWER_OFFLINE, answer }))
}

// Load answer
export const loadAnswer = (answer) => ({ type: ActionTypes.LOAD_ANSWER, answer })

// change answer text
export const changeAnswerText = (text) => ({ type: ActionTypes.CHANGE_ANSWER_TEXT, text })

// add daily prompt
export const addDailyPrompt = (user_id, prompt_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.ADD_DAILY_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/daily/add', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.ADD_DAILY_PROMPT_OFFLINE, prompt_id }))
}

// remove daily prompt
export const removeDailyPrompt = (user_id, prompt_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.REMOVE_DAILY_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/daily/remove', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.REMOVE_DAILY_PROMPT_OFFLINE, prompt_id }))
}

// add favorite prompt
export const addFavoritePrompt = (user_id, prompt_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.ADD_FAVORITE_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/favorites/add', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.ADD_FAVORITE_PROMPT_OFFLINE, prompt_id }))
}

// remove favorite prompt
export const removeFavoritePrompt = (user_id, prompt_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.REMOVE_FAVORITE_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/favorites/remove', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.REMOVE_FAVORITE_PROMPT_OFFLINE, prompt_id }))
}

// add save prompt
export const addSavePrompt = (user_id, prompt_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.ADD_SAVE_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/saved/add', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.ADD_SAVE_PROMPT_OFFLINE, prompt_id }))
}

// remove save prompt
export const removeSavePrompt = (user_id, prompt_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.REMOVE_SAVE_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/saved/remove', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.REMOVE_SAVE_PROMPT_OFFLINE, prompt_id }))
}

// delete answer
export const deleteAnswer = (answer_id) => (dispatch, getState) => {
  dispatch({ type: ActionTypes.DELETE_ANSWER, answer_id })

  return fetch(ActionTypes.URL + '/api/answer/delete', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ answer_id }) })
    .then(handleErrors)
    .then(responseJson => checkOffline(dispatch, getState))
    .catch(error => dispatch({ type: ActionTypes.DELETE_ANSWER_OFFLINE, answer_id }))
}
