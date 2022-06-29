import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SearchBar = () => {
  return (
    <div id='searchBar'>
      <Form className='d-flex'>
        <Form.Control
          type='search'
          placeholder='Search for a movie title'
          className='me-2'
          aria-label='Search'
        />
        <Button variant='outline-success'>Search</Button>
      </Form>
    </div>
  )
}

export default SearchBar
