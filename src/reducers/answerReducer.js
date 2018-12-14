import initialState from './initialState';
import ActionTypes from '../actions/actionTypes';

const answerReducer = (state = initialState.answer, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_ANSWER:
      return action.answer;

    case ActionTypes.LOAD_ANSWER:
      return action.answer;

    case ActionTypes.CHANGE_ANSWER_TEXT:
      return { ...state, text: action.text };

    case ActionTypes.DELETE_ANSWER:
      return state._id === action.answer_id ? initialState.answer : state;

    case ActionTypes.SIGNUP_USER_SUCCESS:
      return { ...state, user_name: action.user.name };

    case ActionTypes.LOGOUT:
      return initialState.answer;

    case ActionTypes.DELETE_PROMPT:
      return state.prompt_id === action.prompt_id ? initialState.answer : state;

    case ActionTypes.LOGIN_USER_SUCCESS:
      return { ...state, user_id: action.user._id, user_name: action.user.name };

    case ActionTypes.SHARE_ANSWER:
      return {
        ...state,
        shared: true,
        sharedOn: new Date(),
        anonymous: action.anonymous,
        likes: (state.likes || 0) + 1,
        likers: [...(state.likers || []), action.answer.user_id]
      };

    case ActionTypes.UNSHARE_ANSWER:
      return { ...state, shared: false, sharedOn: null, likes: state.likes - 1 };

    default:
      return state;
  }
};

export default answerReducer;
