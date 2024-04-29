import React from 'react'
import { Link } from 'react-router-dom'

export const Sidenav = () => {



  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-200 p-10'>
        <h1 className='text-2xl text-white font-bold'>
            <i class="text-[#6556CD] ri-tv-fill mr-2"></i>
            <span className='text-2xl'>Reel <span className='text-[#6556CD]'>Pedia</span></span>
        </h1>
        <nav className='flex flex-col text-zinc-200 text-xl gap-3'>
            <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New Feeds</h1>
            
            <Link to={"/trending"} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
            <i class="mr-2 ri-fire-fill"></i> Trending
            </Link>
            
            <Link to={"/popular"} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
            <i class="mr-2 ri-bard-fill"></i> Popular
            </Link>
            
            <Link to={"/movies"} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
            <i class="mr-2 ri-movie-2-fill"></i> Movies
            </Link>
            
            <Link to={"/tv-show"} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
            <i class="mr-2 ri-tv-2-fill"></i> TV Show
            </Link>
            
            <Link  to={"/people"} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
            <i class="mr-2 ri-team-fill"></i> People
            </Link>
        </nav>

        <hr className='border-none h-[1px] bg-zinc-400'/>

        <nav className='flex flex-col text-zinc-200 text-xl gap-3'>
            
        <h1 className='text-white font-semibold text-xl mt-10 mb-5'>Website Information</h1>
            
            <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
                <i class="mr-2 ri-information-fill"></i> About Reel Pedia
            </Link>
                
            <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
                <i class="mr-2 ri-phone-fill"></i> Contact 
            </Link>
        </nav>
        
    </div>
  )
}
