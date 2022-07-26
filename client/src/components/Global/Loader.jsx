import ClipLoader from 'react-spinners/ClipLoader'
import React from 'react'

const Loader = (props) => {
  return (
    <div className='loader' style={{ textAlign: 'center', padding: '2rem' }}>
      <ClipLoader loading={props.loading} size={35} color='#c3d9ff' />
    </div>
  )
}

export default Loader
