import React from 'react'
import SearchBar from '../components/SearchBar'
import WelcomeMessage from './../components/WelcomeMessage'
import PopularMovies from './../components/PopularMovies'

const Home = () => {
  return (
    <>
      <SearchBar />
      <WelcomeMessage />
      <PopularMovies />
    </>
  )
}

export default Home
