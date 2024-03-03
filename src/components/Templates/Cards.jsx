import React from 'react'
import { Link } from 'react-router-dom'
import no_Image from "../Templates/no_Image.jpg"

const Cards = ({data, title}) => {
  
    return (
    <div className='flex flex-wrap w-full  h-full bg-[#1F1E24] px-[5%]'>
        {
            data.length > 0 ? data.map((card, index) => (
                <Link 
                    to={`/${card.media_type || title}/details/${card.id}`}
                    key={index}
                    className="relative w-[25vh]  h-[35vh] mr-[5%] mt-[4%] mb-[6%]"
                >

                    <img 
                        className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]  h-[40vh] w-full object-cover'
                        src={card.poster_path || card.backdrop_path || card.profile_path ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path || card.profile_path}`: no_Image}
                    />
                    
                    <h1 className='text-2xl text-zinc-300 mt-3 font-semibold overflow-y-auto'>
                        {card.name || card.title || card.original_name || card.original_title}
                    </h1>

                    {card.vote_average && <div 
                        className='absolute text-white w-[5vh] right-[-10%] bottom-[25%] bg-yellow-500 text-xl font-semibold rounded full flex justify-center items-center'
                    >
                        {(card.vote_average*10).toFixed()} <sup>%</sup>
                    </div>
                    }
                    
                </Link>
            )) : <h1 className='text-3xl text-white font-black text-center'>No similar Movies/TV show</h1>
        }
    </div>
  )
}

export default Cards