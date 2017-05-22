import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const newPromptReducer = (state = initialState.newPrompt, action) => {
  switch(action.type) {

    case ActionTypes.CHANGE_NEW_PROMPT_TITLE:
      return { ...state, title: action.title }

    case ActionTypes.PICK_NEW_PROMPT_CATEGORY:
      const categories = state.categories.slice()
      const category = action.category
      const categoryIndex = categories.indexOf(category)
      categoryIndex === -1 ? categories.push(category) : categories.splice(categoryIndex, 1)
      return { ...state, categories: categories }

    case ActionTypes.CLEAR_NEW_PROMPT:
      return initialState.newPrompt

    default:
      return state
  }
}

export default newPromptReducer
