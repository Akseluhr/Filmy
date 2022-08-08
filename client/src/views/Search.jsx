import React, { useEffect, useState } from 'react'

import ActiveSearch from './../components/Search/ActiveSearch'
import Error from './../components/Global/Error'
import Loader from '../components/Global/Loader'
import Results from './../components/Search/Results'
import { fetchRecommendations } from './../api/fetchRecommendations'
import { useParams } from 'react-router-dom'

const Search = () => {
  const { query } = useParams()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      const response = await fetchRecommendations(query)

      if (response === null) {
        setError(true)
        setLoading(false)
        return
      }

      console.log(response)
      setRecommendations(response.data.recommendations)
      setLoading(false)
    }
    fetchData()
  }, [query])

  return loading ? (
    <Loader />
  ) : error ? (
    <Error />
  ) : (
    <>
      <ActiveSearch movieTitle={query} />
      <Results recommendations={recommendations} />
    </>
  )
}

export default Search
