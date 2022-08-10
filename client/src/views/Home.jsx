import Logo from './../components/Home/Logo'
import React from 'react'
import SearchBar from '../components/Global/SearchBar'
import WelcomeMessage from '../components/Home/WelcomeMessage'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [randomizedClick, setRandomizedClick] = useState(false)
  const navigate = useNavigate()

  const handleRandomizedClick = () => {
    setRandomizedClick(true)
  }

  useEffect(() => {
    if (randomizedClick) {
      navigate(`/search/randomized-click`)
    }
  }, [randomizedClick])
  return (
    <>
      <Logo />
      <SearchBar type='centered' handleClick={handleRandomizedClick}/>
      <WelcomeMessage />
    </>
  )
}

export default Home
