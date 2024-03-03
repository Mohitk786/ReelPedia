import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Topnav from './Templates/Topnav';
import Dropdown from './Templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Templates/Loading';
import Cards from './Templates/Cards';

const Movie = () => {
  
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movies, setmovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasmore, sethasMore] = useState(true)
    document.title = "Movies "+ category.toLocaleUpperCase()
  
    const getMovies = async()=>{
        try{
            const data = await axios.get(`/movie/${category}?page=${page}`)
            const result = data.data.results
            
            if(result.length > 0){
                setmovies((prev) => [...prev, ...result])
                setPage(page+1)
            }else{
                sethasMore(false);
            }

        }catch(err){
            console.log(err.message)
        }
    };

    const refreshHandler = async () =>{
        try{
            if(movies.length === 0) getMovies();
            else {
                setPage(1)
                setmovies([])
                getMovies()
            }
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        refreshHandler();
    }, [category]);


    return movies.length>0 ? (
        <div className='w-screen h-screen '>
            
            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='text-2xl text-zinc-400 font-semibold'>
                    <i onClick={()=>navigate(-1)} class="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "}Movies<small className='text-sm ml-2 text-zinc-700'> ({category})</small></h1>
    
                <div className='flex items-center w-[80%]'>
                    <Topnav/>
                    <Dropdown 
                        title="Category" 
                        options={["popular", "top_rated", "upcoming", "now_playing"]} 
                        func={(e)=>setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                    
                </div>
            </div>
    
            <InfiniteScroll
                dataLength={movies.length}
                next={getMovies()}         //what to do id data is finished
                hasMore={hasmore}
                loader={<h1>Loading...</h1>}  //if data is coming
            >
                <Cards data={movies} title="movie"/>
            </InfiniteScroll>
    
        </div>
        ) : (
            <Loading/>
        )
  
}

export default Movie