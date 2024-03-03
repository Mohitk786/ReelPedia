import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "../../utils/axios"
import no_image from "./no_Image.jpg"

const Topnav = () => {

    const [query,setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const getSearches = async()=>{
        try{
            const data = await axios.get(`/search/multi?query=${query}`)
            setSearches(data.data.results);

        }catch(err){
            console.log(err.message)
        }
    };

    useEffect(()=>{
        getSearches();
    }, [query])



    return (
    <div className="z-[100] w-full h-[10vh] flex items-center justify-start relative ml-[15%]">
        <i class="text-zinc-400 text-3xl ri-search-line"></i>
        <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className='w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent'
            type='text'
            placeholder='search Movies/TV Show'
        />
        {
            query.length > 0 && (
            <i 
                onClick={()=>setQuery("")}
                class="text-zinc-400 text-3xl ri-close-fill">
            </i>)
        }
        


        <div className='absolute bg-zinc-200 w-[50%] max-h-[50vh] left-[5%] top-[100%] overflow-auto'>
            
            {
                searches && searches.map((search, index)=>{
                    return <Link 
                        to={`/${search.media_type}/details/${search.id}`}
                        key={index} 
                        className='hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start 
                        items-center border-b-2 border-zinc-100'
                    >
                        
                        <img 
                            className='w-[10vh] h-[10hv] object-cover shadow-lg rounded mr-5'
                            src={ search.backdrop_path || search.profile_path ? `https://image.tmdb.org/t/p/original/${search.backdrop_path || search.profile_path}` : no_image} 
                            alt=''/>
                        <span>{search.name || search.title || search.original_name || search.original_title}</span>
                    </Link>
                    })
            }
            
            
        </div>

    </div>
  )
}

export default Topnav