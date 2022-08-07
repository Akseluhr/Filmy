import PopularMovies from './../components/Home/PopularMovies'
import React from 'react'
import SearchBar from '../components/Global/SearchBar'
import WelcomeMessage from '../components/Home/WelcomeMessage'

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
