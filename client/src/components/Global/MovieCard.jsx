import {
  INITIAL_STATE,
  STATES,
  movieCardReducer,
} from '../../services/movieCardReducer'
import { useEffect, useReducer, useState } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import Loader from './Loader'
import React from 'react'
import { fetchMovie } from '../../api/fetchMovie'
import { formatId } from './../../api/formatId'

const MovieCard = (props) => {
  const [state, dispatch] = useReducer(movieCardReducer, INITIAL_STATE)
  const [imdbId, setImdbId] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const id = formatId(props.id)
      setImdbId(id)

      const data = await fetchMovie(id)

      if (data === null) {
        dispatch({ type: STATES.ERROR })
        return
      }

      dispatch({
        type: STATES.SUCCESS,
        payload: data,
      })
    }

    fetchData()
  }, [props.id, props.idx])

  return state.loading ? (
    <Loader />
  ) : state.error ? (
    <p>⚠️ Error</p>
  ) : (
    <LinkContainer to={`/movie/${imdbId}`}>
      <div className='movieCard'>
        <img src={state.img} alt='Movie' className='movieImg' />
        <div className='movieInfo'>
          <h6>{state.title}</h6>
        </div>
      </div>
    </LinkContainer>
  )
}

export default MovieCard
