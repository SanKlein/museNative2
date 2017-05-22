import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const seenReducer = (state = initialState.seen, action) => {
  switch(action.type) {

    case ActionTypes.RESET_SEEN:
      return { today: new Date(), prompts: [] }

    case ActionTypes.CREATE_NEW_ANSWER:
      return { ...state, prompts: [ ...state.prompts, action.answer.prompt_id ] }

    default:
      return state
  }
}

export default seenReducer
