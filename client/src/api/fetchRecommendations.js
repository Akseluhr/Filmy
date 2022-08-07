const axios = require('axios').default
const apiBaseURL = ' http://0.0.0.0:8085/recms'
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

export const fetchRecommendations = async (movieTitle) => {
  const body = { movie_title: movieTitle }

  const response = await axios.post(apiBaseURL, body, config)
  return response
}
