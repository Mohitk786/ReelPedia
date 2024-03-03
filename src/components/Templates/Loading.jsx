import React from 'react'
import loading from "./Loading.css"


const Loading = () => {
  return (
    <div className='w-screen h-screen  z-50 flex items-center justify-center'>
      <span class="loader"></span>
    </div>
  )
}

export default Loading