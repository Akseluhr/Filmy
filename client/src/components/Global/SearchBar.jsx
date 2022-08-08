import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SearchBar = (props) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  return (
    <div className={props.type}>
      <Form
        className='d-flex'
        onSubmit={(e) => {
          e.preventDefault()
          navigate(`/search/${query}`)
        }}
      >
        <Form.Control
          type='search'
          placeholder='Search for a movie title'
          className='me-2'
          aria-label='Search'
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button variant='outline-primary' type='submit'>
          Search
        </Button>
      </Form>
    </div>
  )
}

export default SearchBar
