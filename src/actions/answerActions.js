import ActionTypes from './actionTypes'
import { handleErrors } from './userActions'

// create new answer
export const createNewAnswer = (answer) => ({ type: ActionTypes.CREATE_NEW_ANSWER, answer })

// save answer text
export const saveAnswer = (answer) => (dispatch) => {
  dispatch({ type: ActionTypes.SAVE_ANSWER, answer })  // save answer

  return fetch(ActionTypes.URL + '/api/answer/save', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ answer }) })
    .then(handleErrors)
    .then(responseJson => console.log('Save answer successful'))
    .catch(error => console.log('Failed to save answer'))
}

// Load answer
export const loadAnswer = (answer) => ({ type: ActionTypes.LOAD_ANSWER, answer })

// change answer text
export const changeAnswerText = (text) => ({ type: ActionTypes.CHANGE_ANSWER_TEXT, text })

// add daily prompt
export const addDailyPrompt = (user_id, prompt_id) => (dispatch) => {
  dispatch({ type: ActionTypes.ADD_DAILY_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/daily/add', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => console.log('Add daily successful'))
    .catch(error => console.log('Failed to add daily prompt'))
}

// remove daily prompt
export const removeDailyPrompt = (user_id, prompt_id) => (dispatch) => {
  dispatch({ type: ActionTypes.REMOVE_DAILY_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/daily/remove', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => console.log('Remove daily successful'))
    .catch(error => console.log('Failed to remove daily prompt'))
}

// add favorite prompt
export const addFavoritePrompt = (user_id, prompt_id) => (dispatch) => {
  dispatch({ type: ActionTypes.ADD_FAVORITE_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/favorites/add', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => console.log('Add favorites successful'))
    .catch(error => console.log('Failed to add favorites prompt'))
}

// remove favorite prompt
export const removeFavoritePrompt = (user_id, prompt_id) => (dispatch) => {
  dispatch({ type: ActionTypes.REMOVE_FAVORITE_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/favorites/remove', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => console.log('Remove favorites successful'))
    .catch(error => console.log('Failed to remove favorites prompt'))
}

// add save prompt
export const addSavePrompt = (user_id, prompt_id) => (dispatch) => {
  dispatch({ type: ActionTypes.ADD_SAVE_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/saved/add', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => console.log('Add saved successful'))
    .catch(error => console.log('Failed to add saved prompt'))
}

// remove save prompt
export const removeSavePrompt = (user_id, prompt_id) => (dispatch) => {
  dispatch({ type: ActionTypes.REMOVE_SAVE_PROMPT, prompt_id })

  return fetch(ActionTypes.URL + '/api/prompt/saved/remove', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, prompt_id }) })
    .then(handleErrors)
    .then(responseJson => console.log('Remove saved successful'))
    .catch(error => console.log('Failed to remove saved prompt'))
}

// delete answer
export const deleteAnswer = (answer_id) => (dispatch) => {
  dispatch({ type: ActionTypes.DELETE_ANSWER, answer_id })

  return fetch(ActionTypes.URL + '/api/answer/delete', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ answer_id }) })
    .then(handleErrors)
    .then(responseJson => console.log('Delete answer successful'))
    .catch(error => console.log('Failed to delete answer'))
}
