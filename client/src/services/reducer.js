export const INITIAL_STATE = {
  loading: true,
  error: false,
}

export const STATES = {
  ERROR: 'FETCH_ERROR',
  SUCCESS: 'FETCH_SUCCESS',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case STATES.ERROR:
      return {
        loading: false,
        error: true,
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
