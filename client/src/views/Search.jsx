import React from 'react'
import { useParams } from 'react-router-dom'

const Search = () => {
  const { query } = useParams()
  return (
    <>
      <div>
        <h3>Search</h3>
        <p>{query}</p>
      </div>
    </>
  )
}

export default Search
