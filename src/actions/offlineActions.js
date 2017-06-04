import ActionTypes from './actionTypes'
import { handleErrors } from './userActions'

export const checkOffline = (dispatch, getState) => {
  const { user, offline } = getState()

  if (offline.beenOffline) {
    dispatch({ type: ActionTypes.OFFLINE_SAVE })

    return fetch(ActionTypes.URL + '/api/offline/save', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user._id, offline }) })
      .then(handleErrors)
      .then(responseJson => dispatch({ type: ActionTypes.OFFLINE_SAVE_SUCCESS, user: responseJson.user, answers: responseJson.answers, myPrompts: responseJson.myPrompts }))
      .catch(error => dispatch({ type: ActionTypes.OFFLINE_SAVE_FAIL }))
  }
}
