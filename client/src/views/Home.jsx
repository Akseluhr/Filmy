import React from 'react'
import SearchBar from '../components/Home/SearchBar'
import WelcomeMessage from '../components/Home/WelcomeMessage'
import PopularMovies from '../components/Home/PopularMovies'

const Home = () => {
  return (
    <>
      <SearchBar type='centered' />
      <WelcomeMessage />
      <PopularMovies />
    </>
  )
}

export default Home
