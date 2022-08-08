import React from 'react'

const ActiveSearch = (props) => {
  return (
    <div className='activeSearch'>
      <p>
        Showing recommendations for <i>{props.movieTitle}:</i>
      </p>
    </div>
  )
}

export default ActiveSearch
