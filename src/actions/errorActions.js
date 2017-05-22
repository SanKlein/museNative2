import ActionTypes from './actionTypes'

// set error
export const setError = (error) => ({ type: ActionTypes.SET_ERROR, error })

// clear error
export const clearError = () => ({ type: ActionTypes.CLEAR_ERROR })
