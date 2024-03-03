import React from 'react'
import notFound from "./404.gif"

const NotFound = () => {
  return (
    <div className='text-white flex items-center justify-center w-screen h-screen'>
        <img 
          className='w-full h-full'
          src={notFound}
          alt='404 Page not found'
        />
    </div>
  )
}

export default NotFound