const axios = require('axios').default
const apiBaseURL = 'https://imdb-api.com/en/API/Title'
// const apiKey = 'k_yzqb0jra'
const apiKey = 'k_vfb8ygq4'

export const fetchMovie = async (id) => {
  try {
    const response = await axios.get(`${apiBaseURL}/${apiKey}/${id}`)
    console.log(response)
    if (response.status >= 300 || response.data.errorMessage != null)
      return null
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}
