import { combineReducers } from 'redux'
import state from './stateReducer'
import loading from './loadingReducer'
import error from './errorReducer'
import login from './loginReducer'
import user from './userReducer'
import editUser from './editUserReducer'
import answerState from './answerStateReducer'
import answer from './answerReducer'
import categories from './categoriesReducer'
import category from './categoryReducer'
import list from './listReducer'
import search from './searchReducer'
import newPrompt from './newPromptReducer'
import todayPrompt from './todayPromptReducer'
import myPrompts from './myPromptsReducer'
import prompts from './promptsReducer'
import answers from './answersReducer'
import seen from './seenReducer'

const rootReducer = combineReducers({
  state,
  loading,
  error,
  login,
  user,
  editUser,
  answerState,
  answer,
  categories,
  category,
  list,
  search,
  newPrompt,
  todayPrompt,
  myPrompts,
  prompts,
  answers,
  seen,
})

export default rootReducer
