import React, { useEffect, useState } from 'react'

import ActiveSearch from './../components/Search/ActiveSearch'
import Error from './../components/Global/Error'
import Loader from '../components/Global/Loader'
import Results from './../components/Search/Results'
import { fetchRecommendations } from './../api/fetchRecommendations'
import { fetchTop250Movies } from '../api/fetchRandomMovie'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Search = () => {
  const { query } = useParams()
  const location = useLocation()
  const [recommendations, setRecommendations] = useState([])
  const [top250Movies, setTopMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const selectRandomMovie = (movies) => {
      const length = movies.lenght
      const randomIdx = Math.floor(Math.random() * length+1);
      console.log(movies[randomIdx])
      return movies[randomIdx]
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      let response;
      console.log(location)

      if (location.pathname === '/search/randomized-click') {
        console.log('random')
        response = await fetchTop250Movies()
        console.log(response)
        console.log(response.data)
        setTopMovies(response.data.items)
        const randomMovie = selectRandomMovie(top250Movies)
        console.log(randomMovie)
      }
      else if (query){
        console.log('övrig')
        response = await fetchRecommendations(query)
        console.log(response)
        setRecommendations(response.data.recommendations)
      }

      if (response === null) {
        setError(true)
        setLoading(false)
        return
      }

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
