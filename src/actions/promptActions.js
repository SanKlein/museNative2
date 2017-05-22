import ActionTypes from './actionTypes'
import { handleErrors } from './userActions'

// load category
export const loadCategory = (category) => ({ type: ActionTypes.LOAD_CATEGORY, category })

// load list
export const loadList = (list) => ({ type: ActionTypes.LOAD_LIST, list })

// edit new prompt title
export const changeNewPromptTitle = (title) => ({ type: ActionTypes.CHANGE_NEW_PROMPT_TITLE, title })

// add category to new prompt
export const pickNewPromptCategory = (category) => ({ type: ActionTypes.PICK_NEW_PROMPT_CATEGORY, category })

// create new prompt
export const createNewPrompt = (prompt) => (dispatch) => {
  dispatch({ type: ActionTypes.CREATE_NEW_PROMPT, prompt })  // create new prompt

  return fetch(ActionTypes.URL + '/api/prompt/create', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) })
    .then(handleErrors)
    .then(responseJson => console.log('Created new prompt'))
    .catch(error => console.log('Failed to create new prompt'))
}

// clear new prompt
export const clearNewPrompt = () => ({ type: ActionTypes.CLEAR_NEW_PROMPT })

// load approved prompts
export const loadApprovedPrompts = () => (dispatch) => {
  dispatch({ type: ActionTypes.SET_LOADING })

  return fetch(ActionTypes.URL + '/api/prompts/approved', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
    .then(handleErrors)
    .then(responseJson => dispatch({ type: ActionTypes.LOAD_APPROVED_PROMPTS_SUCCESS, prompts: responseJson.prompts }))
    .catch(error => console.log('Failed to load approved prompts'))
}

// load user prompts
export const loadUserPrompts = (_id) => (dispatch) => {
  return fetch(ActionTypes.URL + '/api/prompts/user', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ _id }) })
    .then(handleErrors)
    .then(responseJson => dispatch({ type: ActionTypes.LOAD_USER_PROMPTS_SUCCESS, prompts: responseJson.prompts }))
    .catch(error => console.log('Failed to load user prompts'))
}

export const loadTodayPrompt = () => (dispatch) => {
  return fetch(ActionTypes.URL + '/api/prompt/today', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
    .then(handleErrors)
    .then(responseJson => dispatch({ type: ActionTypes.LOAD_TODAY_PROMPT_SUCCESS, prompt_id: responseJson.today }))
    .catch(error => console.log('Failed to load today prompt'))
}
