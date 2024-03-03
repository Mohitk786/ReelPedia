import React from 'react'
import { Link } from 'react-router-dom'

export const Header = ({data}) => {
  return (
    <div
        style={{background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
                backgroundPosition: 'center',
                backgroundSize:"cover",
                backgroundRepeat:"no-repeat"
              }} 
        className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'>

            <h1 className='w-[70%] text-5xl font-black text-white'
            >
                {data.name || data.title || data.original_name || data.original_title}
            </h1>

            <p className='w-[70%] mb-3 text-white mt-3'>{data.overview.slice(0,200)}....<Link className="text-blue-400">more</Link></p>
            <p className='text-white'>
                <i class="text-yellow-500 ri-megaphone-fill"></i>{" "}{data.release_date || "00-00-0000"}
                <i class="text-yellow-500 ml-5 ri-album-fill"></i>{" "}{data.media_type.toUpperCase()}
            </p>

            <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='p-4 rounded text-white font-semibold mt-5 bg-[#5656CD]'>{" "}Watch trailer</Link>

    </div>
  )
}
