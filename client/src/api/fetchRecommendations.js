const axios = require('axios').default
const apiBaseURL = ' http://127.0.0.1:5000/recms'
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

export const fetchRecommendations = async (movieTitle) => {
  const body = { movie_title: movieTitle }
  try {
    const response = await axios.post(apiBaseURL, body, config)
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}
