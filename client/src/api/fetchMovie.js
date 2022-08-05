const axios = require('axios').default
const apiBaseURL = 'https://imdb-api.com/en/API/Title'
const apiKey = 'k_yzqb0jra'

export const fetchMovie = async (id) => {
  const response = await axios.get(`${apiBaseURL}/${apiKey}/${id}`)
  const data = response.data
  console.log(data)
  return data
}
