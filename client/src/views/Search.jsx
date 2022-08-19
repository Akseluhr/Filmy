import { INITIAL_STATE, STATES, reducer } from '../services/reducer'
import React, { useEffect, useReducer } from 'react'

import ActiveSearch from './../components/Search/ActiveSearch'
import Error from './../components/Global/Error'
import Loader from '../components/Global/Loader'
import Results from './../components/Search/Results'
import { fetchRecommendations } from './../api/fetchRecommendations'
import { useParams } from 'react-router-dom'

const Search = () => {
  const { query } = useParams()
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRecommendations(query)

      if (response === null) {
        dispatch({ type: STATES.ERROR })
        return
      }

      const data = response.data.recommendations

      dispatch({
        type: STATES.SUCCESS,
        payload: data,
      })
    }

    fetchData()
  }, [query])

  return state.loading ? (
    <Loader />
  ) : state.error ? (
    <Error />
  ) : (
    <>
      <ActiveSearch movieTitle={query} />
      <Results recommendations={state.data} />
    </>
  )
}

export default Search
