import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const userReducer = (state = initialState.user, action) => {
  switch(action.type) {

    case ActionTypes.CREATE_USER_REQUEST:
      return { ...state, _id: action.user._id, categories: action.user.categories }

    case ActionTypes.SAVE_ANSWER:
      let newSaveAnswerState = { ...state }
      const saveAnswered = state.answered
      const saveSaved = state.saved
      const saveAnswerPromptId = action.answer.prompt_id
      if (!saveAnswered.includes(saveAnswerPromptId)) {
        newSaveAnswerState.answered = [ ...saveAnswered, saveAnswerPromptId ]
      }
      const saveSaveIndex = saveSaved.indexOf(saveAnswerPromptId)
      if (saveSaveIndex !== -1) newSaveAnswerState.saved.splice(saveSaveIndex, 1)
      newSaveAnswerState.score += action.answer.score
      return newSaveAnswerState

    case ActionTypes.ADD_HIDE_PROMPT:
      const addHidePrompts = state.hide.concat(action.prompt_id)
      return { ...state, hide: addHidePrompts }

    case ActionTypes.REMOVE_HIDE_PROMPT:
      const removeHidePrompts = state.hide.filter(prompt => prompt !== action.prompt_id)
      return { ...state, hide: removeHidePrompts }

    case ActionTypes.ADD_DAILY_PROMPT:
      const addDailyPrompts = state.daily.concat(action.prompt_id)
      return { ...state, daily: addDailyPrompts }

    case ActionTypes.REMOVE_DAILY_PROMPT:
      const removeDailyPrompts = state.daily.filter(prompt => prompt !== action.prompt_id)
      return { ...state, daily: removeDailyPrompts }

    case ActionTypes.ADD_FAVORITE_PROMPT:
      const addFavoritePrompts = state.favorites.concat(action.prompt_id)
      return { ...state, favorites: addFavoritePrompts }

    case ActionTypes.REMOVE_FAVORITE_PROMPT:
      const removeFavoritePrompts = state.favorites.filter(prompt => prompt !== action.prompt_id)
      return { ...state, favorites: removeFavoritePrompts }

    case ActionTypes.ADD_SAVE_PROMPT:
      const addSavePrompts = state.saved.concat(action.prompt_id)
      return { ...state, saved: addSavePrompts }

    case ActionTypes.REMOVE_SAVE_PROMPT:
      const removeSavePrompts = state.saved.filter(prompt => prompt !== action.prompt_id)
      return { ...state, saved: removeSavePrompts }

    case ActionTypes.SAVE_USER_CATEGORIES:
      return { ...state, categories: action.categories }

    case ActionTypes.DELETE_ANSWER:
      let deleteAnswerIndex = state.answered.indexOf(action.answer_id)
      return { ...state, answered: [ ...state.answered.slice(0, deleteAnswerIndex), ...state.answered.slice(deleteAnswerIndex + 1) ] }

    case ActionTypes.CREATE_NEW_PROMPT:
      return { ...state, created: [ ...state.created, action.prompt._id ] }

    case ActionTypes.LOGOUT:
      let newDate = new Date()
      newDate.setDate(newDate.getDate() - 1)
      return { ...initialState.user, last: newDate }

    case ActionTypes.SIGNUP_USER_SUCCESS:
      return { ...state, name: action.user.name, email: action.user.email }

    case ActionTypes.LOGIN_USER_SUCCESS:
      return action.user

    case ActionTypes.LOAD_USER_SUCCESS:
      return action.user

    case ActionTypes.DELETE_PROMPT:
      const deleteFavoritePrompts = state.favorites.filter(prompt => prompt !== action.prompt_id)
      const deleteCreatedPrompts = state.created.filter(prompt => prompt !== action.prompt_id)
      const deleteSavedPrompts = state.saved.filter(prompt => prompt !== action.prompt_id)
      const deleteHidePrompts = state.hide.filter(prompt => prompt !== action.prompt_id)
      const deleteDailyPrompts = state.daily.filter(prompt => prompt !== action.prompt_id)
      return { ...state, favorites: deleteFavoritePrompts, created: deleteCreatedPrompts, saved: deleteSavedPrompts, hide: deleteHidePrompts, daily: deleteDailyPrompts }

    case ActionTypes.UPDATE_STREAK:
      let newState = { ...state }
      const streak = newState.streak + 1
      const longest = newState.longestStreak > streak ? newState.longestStreak : streak
      return { ...state, streak: streak, last: new Date(), longestStreak: longest }

    case ActionTypes.RESET_STREAK:
      return { ...state, streak: 1, last: new Date() }

    case ActionTypes.SAVE_EDIT_USER_SUCCESS:
      return { ...state, name: action.user.name, email: action.user.email }

    default:
      return state
  }
}

export default userReducer
