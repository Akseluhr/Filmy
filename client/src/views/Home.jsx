import React, { useEffect } from 'react'

import PopularMovies from './../components/Home/PopularMovies'
import SearchBar from '../components/Global/SearchBar'
import WelcomeMessage from '../components/Home/WelcomeMessage'
import { fetchRecommendations } from '../api/fetchRecommendations'

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = fetchRecommendations('Iron Man (2008)')
      console.log(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <SearchBar type='centered' />
      <WelcomeMessage />
      <PopularMovies />
    </>
  )
}

export default Home
