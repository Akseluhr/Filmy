import React, { useEffect, useState } from 'react'

import ActiveSearch from './../components/Search/ActiveSearch'
import Loader from '../components/Global/Loader'
import Results from './../components/Search/Results'
import { fetchRecommendations } from './../api/fetchRecommendations'
import { useParams } from 'react-router-dom'

const Search = () => {
  const { query } = useParams()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRecommendations(query)
      console.log(response)
      setRecommendations(response.data.recommendations)
      setLoading(false)
    }
    fetchData()
  }, [query])

  return loading ? (
    <Loader />
  ) : (
    <>
      <ActiveSearch />
      <Results recommendations={recommendations} />
    </>
  )
}

export default Search
