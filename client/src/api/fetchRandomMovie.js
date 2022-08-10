const axios = require('axios').default
const apiBaseURL = 'https://imdb-api.com/en/API/Top250Movies'
const apiKey = 'k_yzqb0jra'
//const apiKey = 'k_vfb8ygq4'

export const fetchTop250Movies = async () => {
  try {
    const response = await axios.get(`${apiBaseURL}/${apiKey}`)
    console.log(response, 'gogo')
    if (response.status >= 300 || response.data.errorMessage != null)
      return null
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}
