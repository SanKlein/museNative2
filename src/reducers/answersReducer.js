import initialState from './initialState'
import ActionTypes from '../actions/actionTypes'

const answersReducer = (state = initialState.answers, action) => {
  switch(action.type) {

    case ActionTypes.SAVE_ANSWER:
      const saveAnswer = action.answer
      saveAnswer.modified = new Date()
      const saveAnswerIndex = state.findIndex(answer => answer._id === saveAnswer._id)
      return saveAnswerIndex === -1 ? [ ...state, saveAnswer ] : [ ...state.slice(0, saveAnswerIndex), saveAnswer, ...state.slice(saveAnswerIndex + 1) ]

    case ActionTypes.DELETE_ANSWER:
      let deleteAnswerIndex = state.findIndex(answer => answer._id === action.answer_id)
      return [ ...state.slice(0, deleteAnswerIndex), ...state.slice(deleteAnswerIndex + 1) ]

    case ActionTypes.SIGNUP_USER_SUCCESS:
      let signupAnswers = state.slice()
      signupAnswers.forEach(answer => {
        answer.user_name = action.user.name
      })
      return signupAnswers

    case ActionTypes.LOGIN_USER_SUCCESS:
      let loginAnswers = state.slice()
      loginAnswers.forEach(answer => {
        answer.user_id = action.user._id,
        answer.user_name = action.user.name
      })
      return loginAnswers

    case ActionTypes.LOGOUT:
      return initialState.answers

    case ActionTypes.LOAD_USER_ANSWERS_SUCCESS:
      return action.answers

    default:
      return state
  }
}

export default answersReducer
