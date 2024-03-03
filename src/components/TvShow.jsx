import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Topnav from './Templates/Topnav';
import Dropdown from './Templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Templates/Loading';
import Cards from './Templates/Cards';

const Tvshows = () => {
  
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tvshows, settvshows] = useState([]);
    const [page, setPage] = useState(1);
    const [hasmore, sethasMore] = useState(true)
    document.title = "tvshows "+ category.toLocaleUpperCase()
  
    const gettvshows = async()=>{
        try{
            const data = await axios.get(`/tv/${category}?page=${page}`)
            const result = data.data.results
            
            if(result.length > 0){
                settvshows((prev) => [...prev, ...result])
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
            if(tvshows.length === 0) gettvshows();
            else {
                setPage(1)
                settvshows([])
                gettvshows()
            }
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        refreshHandler();
    }, [category]);


    return tvshows.length>0 ? (
        <div className='w-screen h-screen '>
            
            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='text-2xl text-zinc-400 font-semibold'>
                    <i onClick={()=>navigate(-1)} class="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "}Tv Shows<small className='text-sm ml-2 text-zinc-700'> ({category})</small></h1>
    
                <div className='flex items-center w-[80%]'>
                    <Topnav/>
                    <Dropdown 
                        title="Category" 
                        options={["on_the_air", "top_rated", "popular", "airing_today"]} 
                        func={(e)=>setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                    
                </div>
            </div>
    
            <InfiniteScroll
                dataLength={tvshows.length}
                next={gettvshows()}         //what to do id data is finished
                hasMore={hasmore}
                loader={<Loading/>}  //if data is coming
            >
                <Cards data={tvshows} title="tv"/>
            </InfiniteScroll>
    
        </div>
        ) : (
            <Loading/>
        )
  
}

export default Tvshows