import { combineReducers } from 'redux';
import loading from './loadingReducer';
import error from './errorReducer';
import login from './loginReducer';
import user from './userReducer';
import editUser from './editUserReducer';
import answerState from './answerStateReducer';
import answer from './answerReducer';
import categories from './categoriesReducer';
import category from './categoryReducer';
import list from './listReducer';
import listTitle from './listTitleReducer';
import search from './searchReducer';
import newPrompt from './newPromptReducer';
import todayPrompt from './todayPromptReducer';
import myPrompts from './myPromptsReducer';
import prompts from './promptsReducer';
import answers from './answersReducer';
import seen from './seenReducer';
import offline from './offlineReducer';

const rootReducer = combineReducers({
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
  listTitle,
  search,
  newPrompt,
  todayPrompt,
  myPrompts,
  prompts,
  answers,
  seen,
  offline
});

export default rootReducer;
