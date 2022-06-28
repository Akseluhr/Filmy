import React from 'react'
import Form from 'react-bootstrap/Form'

const SearchBar = () => {
  return (
    <div id='searchBar'>
      <Form.Control size='md' type='text' placeholder='Movie Title' />
    </div>
  )
}

export default SearchBar
