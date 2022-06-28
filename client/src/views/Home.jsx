import React from 'react'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import SearchButton from '../components/SearchButton'
import WelcomeMessage from './../components/WelcomeMessage'
import MovieCard from './../components/MovieCard'

const Home = () => {
  return (
    <>
      <Logo />
      <SearchBar />
      <SearchButton />
      <WelcomeMessage />
      <MovieCard />
    </>
  )
}

export default Home
