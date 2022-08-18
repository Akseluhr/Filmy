export const INITIAL_STATE = {
  loading: true,
  error: false,
  data: [],
}

export const STATES = {
  ERROR: 'FETCH_ERROR',
  SUCCESS: 'FETCH_SUCCESS',
}

export const dataReducer = (state, action) => {
  switch (action.type) {
    case STATES.ERROR:
      return {
        loading: false,
        error: true,
        data: [],
      }
    case STATES.SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.payload,
      }
    default:
      return state
  }
}
