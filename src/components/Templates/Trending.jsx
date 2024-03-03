import React from 'react'
import { Link } from 'react-router-dom'
import no_image from "../Templates/no_Image.jpg"

const Trending = ({data}) => {
  return (

        <div className='w-full p-5 mb-5 flex overflow-y-hidden'>
            {
                data.map((card, index)=>(
                    <Link to={`/${card.media_type}/details/${card.id}`} key={index} className='h-[35vh] overflow-y-auto bg-zinc-900 min-w-[15%] mr-5 mb-5'>
                        
                        <img 
                            className='h-[55%] object-cover '
                            src={card.backdrop_path || card.poster_path ? `https://image.tmdb.org/t/p/original${card.backdrop_path || card.poster_path}`: no_image}
                        />

                        <div className='text-white h-[45%] p-3'>
                            
                            <h1 className='mt-3 text-xl font-semibold'>
                                {card.name || card.title || card.original_name || card.original_title}
                            </h1>

                            <p className=''>{card.overview.slice(0,50)}....<span className="text-zinc-600">more</span></p>
                    
                        </div>
                        
                    </Link>
                ))
            }
        </div>
        
        
  )
}

export default Trending