export const INITIAL_STATE = {
  loading: true,
  error: false,
}

export const STATES = {
  ERROR: 'FETCH_ERROR',
  SUCCESS: 'FETCH_SUCCESS',
}

export const movieCardReducer = (state, action) => {
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
        img: action.payload.image,
        title: action.payload.fullTitle,
      }
    default:
      return state
  }
}
