import initialState from './initialState';
import ActionTypes from '../actions/actionTypes';

const answersReducer = (state = initialState.answers, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_ANSWER:
      const saveAnswer = action.answer;
      saveAnswer.modified = new Date();
      const saveAnswerIndex = state.findIndex(answer => answer._id === saveAnswer._id);
      return saveAnswerIndex === -1
        ? [...state, saveAnswer]
        : [...state.slice(0, saveAnswerIndex), saveAnswer, ...state.slice(saveAnswerIndex + 1)];

    case ActionTypes.DELETE_ANSWER:
      let deleteAnswerIndex = state.findIndex(answer => answer._id === action.answer_id);
      return [...state.slice(0, deleteAnswerIndex), ...state.slice(deleteAnswerIndex + 1)];

    case ActionTypes.SIGNUP_USER_SUCCESS:
      let signupAnswers = state.slice();
      signupAnswers.forEach(answer => {
        answer.user_name = action.user.name;
      });
      return signupAnswers;

    case ActionTypes.LOGIN_USER_SUCCESS:
      let loginAnswers = state.slice();
      loginAnswers.forEach(answer => {
        (answer.user_id = action.user._id), (answer.user_name = action.user.name);
      });
      return loginAnswers;

    case ActionTypes.LOGOUT:
      return initialState.answers;

    case ActionTypes.LOAD_USER_ANSWERS_SUCCESS:
      return action.answers;

    case ActionTypes.OFFLINE_SAVE_SUCCESS:
      return action.answers;

    case ActionTypes.SHARE_ANSWER:
      const index = state.findIndex(a => a._id === action.answer._id);

      return [
        ...state.slice(0, index),
        {
          ...action.answer,
          shared: true,
          sharedOn: new Date(),
          anonymous: action.anonymous,
          likes: (action.answer.likes || 0) + 1,
          likers: [...(action.answer.likers || []), action.answer.user_id]
        },
        ...state.slice(index + 1)
      ];

    case ActionTypes.UNSHARE_ANSWER: {
      const index = state.findIndex(a => a._id === action.answer_id);
      const answer = state[index];

      return [
        ...state.slice(0, index),
        { ...answer, shared: false, sharedOn: null, likes: answer.likes - 1 },
        ...state.slice(index + 1)
      ];
    }

    default:
      return state;
  }
};

export default answersReducer;
