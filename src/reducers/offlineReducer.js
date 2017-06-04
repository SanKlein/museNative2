import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const offlineReducer = (state = initialState.offline, action) => {
  switch(action.type) {

    case ActionTypes.OFFLINE_SAVE:
      return { ...state, beenOffline: false }

    case ActionTypes.OFFLINE_SAVE_SUCCESS:
      return initialState.offline

    case ActionTypes.OFFLINE_SAVE_FAIL:
      return { ...state, beenOffline: true }

    case ActionTypes.SAVE_ANSWER_OFFLINE:
      let saveScore = state.score
      let saveAnswered = [ ...state.answered ]
      let saveAnswer = action.answer
      saveAnswer.modified = new Date()
      let saveAnswerIndex = saveAnswered.findIndex(answer => answer._id === saveAnswer._id)
      let newSaveAnswered = saveAnswerIndex === -1 ? [ ...saveAnswered, saveAnswer ] : [ ...saveAnswered.slice(0, saveAnswerIndex), saveAnswer, ...saveAnswered.slice(saveAnswerIndex + 1) ]

      let saveSaved = [ ...state.saved ]
      let saveRemoveSaved = [ ...state.removeSaved ]
      let saveAnswerPromptId = saveAnswer.prompt_id
      let saveSaveIndex = saveSaved.indexOf(saveAnswerPromptId)
      let saveRemoveIndex = saveRemoveSaved.indexOf(saveAnswerPromptId)
      let newSaveSaved = saveSaved
      let newSaveRemoveSaved = saveRemoveSaved
      if (saveSaveIndex === -1) {
        if (saveRemoveIndex === -1) {
          newSaveRemoveSaved = [ ...saveRemoveSaved, saveAnswerPromptId ]
        } else {
          newSaveRemoveSaved = saveRemoveSaved.splice(saveRemoveIndex, 1)
        }
      } else {
        newSaveSaved = saveSaved.splice(saveSaveIndex, 1)
      }

      let newSaveScore = saveScore + saveAnswer.score

      return { ...state, beenOffline: true, answered: newSaveAnswered, score: newSaveScore, saved: newSaveSaved, removeSaved: newSaveRemoveSaved }

    case ActionTypes.ADD_DAILY_PROMPT_OFFLINE:
      return { ...state, beenOffline: true, daily: [ ...state.daily, action.prompt_id ] }

    case ActionTypes.REMOVE_DAILY_PROMPT_OFFLINE:
      let removeDaily = [ ...state.daily ]
      let removeRemoveDaily = [ ...state.removeDaily ]
      let removeDailyPromptId = action.prompt_id
      let removeDailyIndex = removeDaily.indexOf(removeDailyPromptId)
      let removeRemoveDailyIndex = removeRemoveDaily.indexOf(removeDailyPromptId)
      let newDaily = removeDaily
      let newRemoveDaily = removeRemoveDaily
      if (removeDailyIndex === -1) {
        if (removeRemoveDailyIndex !== -1) {
          newRemoveDaily = removeRemoveDaily.splice(removeRemoveDailyIndex, 1)
        }
      } else {
        newDaily = removeDaily.splice(removeDailyIndex, 1)
      }

      return { ...state, beenOffline: true, daily: newDaily, removeDaily: newRemoveDaily }

    case ActionTypes.ADD_FAVORITE_PROMPT_OFFLINE:
      return { ...state, beenOffline: true, favorites: [ ...state.favorites, action.prompt_id ] }

    case ActionTypes.REMOVE_FAVORITE_PROMPT_OFFLINE:
      let removeFavorites = [ ...state.favorites ]
      let removeRemoveFavorites = [ ...state.removeFavorites ]
      let removeFavoritesPromptId = action.prompt_id
      let removeFavoritesIndex = removeFavorites.indexOf(removeFavoritesPromptId)
      let removeRemoveFavoritesIndex = removeRemoveFavorites.indexOf(removeFavoritesPromptId)
      let newFavorites = removeFavorites
      let newRemoveFavorites = removeRemoveFavorites
      if (removeFavoritesIndex === -1) {
        if (removeRemoveFavoritesIndex !== -1) {
          newRemoveFavorites = removeRemoveFavorites.splice(removeRemoveFavoritesIndex, 1)
        }
      } else {
        newFavorites = removeFavorites.splice(removeFavoritesIndex, 1)
      }

      return { ...state, beenOffline: true, favorites: newFavorites, removeFavorites: newRemoveFavorites }

    case ActionTypes.ADD_SAVE_PROMPT_OFFLINE:
      return { ...state, beenOffline: true, saved: [ ...state.saved, action.prompt_id ] }

    case ActionTypes.REMOVE_SAVE_PROMPT_OFFLINE:
      let removeSaved = [ ...state.saved ]
      let removeRemoveSaved = [ ...state.removeSaved ]
      let removeSavedPromptId = action.prompt_id
      let removeSavedIndex = removeSaved.indexOf(removeSavedPromptId)
      let removeRemoveSavedIndex = removeRemoveSaved.indexOf(removeSavedPromptId)
      let newSaved = removeSaved
      let newRemoveSaved = removeRemoveSaved
      if (removeSavedIndex === -1) {
        if (removeRemoveSavedIndex !== -1) {
          newRemoveSaved = removeRemoveSaved.splice(removeRemoveSavedIndex, 1)
        }
      } else {
        newSaved = removeSaved.splice(removeSavedIndex, 1)
      }

      return { ...state, beenOffline: true, saved: newSaved, removeSaved: newRemoveSaved }

    case ActionTypes.DELETE_ANSWER_OFFLINE:
      return { ...state, beenOffline: true, deleted: [ ...state.deleted, action.answer_id ] }

    case ActionTypes.SIGNUP_USER_SUCCESS:
      let signupAnswered = state.answered.slice()
      signupAnswered.forEach(answer => {
        answer.user_name = action.user.name
      })
      return { ...state, beenOffline: true, answered: signupAnswered }

    case ActionTypes.LOGIN_USER_SUCCESS:
      let loginAnswered = state.answered.slice()
      loginAnswered.forEach(answer => {
        answer.user_id = action.user._id,
        answer.user_name = action.user.name
      })
      return { ...state, beenOffline: true, answered: loginAnswered }

    case ActionTypes.CREATE_NEW_PROMPT_OFFLINE:
      return { ...state, beenOffline: true, created: [ ...state.created, action.prompt ] }

    case ActionTypes.UPDATE_STREAK_OFFLINE:
      let updateUser = action.user
      let streak = updateUser.streak + 1
      let longest = updateUser.longestStreak > streak ? updateUser.longestStreak : streak
      return { ...state, beenOffline: true, streak: streak, last: new Date(), longestStreak: longest }

    case ActionTypes.RESET_STREAK_OFFLINE:
      return { ...state, beenOffline: true, streak: 1, last: new Date() }

    default:
      return state
  }
}

export default offlineReducer
