import Logo from './../components/Home/Logo'
import React from 'react'
import SearchBar from '../components/Global/SearchBar'
import WelcomeMessage from '../components/Home/WelcomeMessage'

const Home = () => {
  return (
    <>
      <Logo />
      <SearchBar type='centered' />
      <WelcomeMessage />
    </>
  )
}

export default Home
