const axios = require('axios').default
const apiBaseURL = ' http://0.0.0.0:8085/recms'

export const fetchRecommendations = async (movieTitle) => {
  const response = await axios.post(
    apiBaseURL,
    {
      data: { movie_title: movieTitle },
    },
    {
      headers: 'Content-Type: application/json',
    }
  )
  return response
}
