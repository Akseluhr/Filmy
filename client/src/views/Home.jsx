import React from 'react'
import SearchBar from '../components/Global/SearchBar'
import WelcomeMessage from '../components/Home/WelcomeMessage'
import MovieCardGrid from './../components/Global/MovieCardGrid'

const Home = () => {
  return (
    <>
      <SearchBar type='centered' />
      <WelcomeMessage />
      <MovieCardGrid length={6} />
    </>
  )
}

export default Home
