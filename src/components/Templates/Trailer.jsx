import React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Trailer = () => {
  
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const category = pathname.includes("movie")? "movie" : "tv";
    const video  = useSelector(state => state[category].info.videos)


    
  
    return (
    <div className='bg-[rgba(0,0,0,0.9)] top-0 z-[100] left-0 absolute w-screen h-screen flex items-center justify-center'>

        <i 
            onClick={()=>navigate(-1)} 
            class="absolute hover:text-[#6556CD] text-3xl text-white right-[5%] top-[5%] ri-close-fill"
        ></i>

        {
            video?.key ? <ReactPlayer 
            controls
            width={1500}
            height={800}
            url={`https://www.youtube.com/watch?v=${video.key}`}
            /> : <div className='text-4xl font-semibold text-white flex items-center justify-center'>No Trailer Available</div>
        }
        

    </div>
  )
}

export default Trailer