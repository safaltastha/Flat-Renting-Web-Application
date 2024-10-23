import React from 'react'
import PropertyListing from '../pages/PropertyListing'

const Flat = () => {
  return (
    <div className=''>
        <h1 className='text-4xl ml-6 mt-6 '>Flats</h1>
        <div className='mb-8'>
        <PropertyListing />
        </div>
    </div>
  )
}

export default Flat