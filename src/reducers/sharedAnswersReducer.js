import initialState from './initialState';
import ActionTypes from '../actions/actionTypes';

const sharedAnswersReducer = (state = initialState.sharedAnswers, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_SHARED_ANSWERS_SUCCESS:
      return action.sharedAnswers;

    case ActionTypes.SHARE_ANSWER:
      return [
        {
          ...action.answer,
          shared: true,
          sharedOn: new Date(),
          anonymous: action.anonymous,
          likes: (action.answer.likes || 0) + 1,
          likers: [...(action.answer.likers || []), action.answer.user_id]
        },
        ...state
      ];

    case ActionTypes.UNSHARE_ANSWER: {
      const index = state.findIndex(a => a._id === action.answer_id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }

    case ActionTypes.LIKE_ANSWER: {
      const index = state.findIndex(a => a._id === action.answer_id);
      const answer = state[index];

      return [
        ...state.slice(0, index),
        { ...answer, likes: answer.likes + 1, likers: [...answer.likers, action.user_id] },
        ...state.slice(index + 1)
      ];
    }

    case ActionTypes.UNLIKE_ANSWER: {
      const index = state.findIndex(a => a._id === action.answer_id);
      const answer = state[index];

      const likeIndex = answer.likers.findIndex(liker => liker === action.user_id);

      return [
        ...state.slice(0, index),
        {
          ...answer,
          likes: answer.likes - 1,
          likers: [...answer.likers.slice(0, likeIndex), ...answer.likers.slice(likeIndex + 1)]
        },
        ...state.slice(index + 1)
      ];
    }

    default:
      return state;
  }
};

export default sharedAnswersReducer;
