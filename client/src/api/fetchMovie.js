const axios = require('axios').default
const apiBaseURL = 'https://imdb-api.com/en/API/Title'
const apiKey = 'k_yzqb0jra'

export const fetchMovie = async (id) => {
  const response = await axios.get(`${apiBaseURL}/${apiKey}/${id}`)

  if (response.status >= 300 || response.data.errorMessage != null) return null

  const data = response.data
  console.log(data)
  return data
}
