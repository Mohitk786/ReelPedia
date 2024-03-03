import React, { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import Topnav from './Templates/Topnav';
import Dropdown from './Templates/Dropdown';
import axios from "../utils/axios"
import Cards from './Templates/Cards';
import Loading from './Templates/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';


const TrendingPage = () => {

    
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasmore, sethasMore] = useState(true)
    document.title = "Trending"
    
    const getTrending = async()=>{
        try{
            const data = await axios.get(`/trending/${category}/${duration}?page=${page}`)
            const result = data.data.results
            
            if(result.length > 0){
                setTrending((prev) => [...prev, ...result])
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
            if(trending.length === 0)  getTrending();
            else {
                setPage(1)
                setTrending([])
                getTrending()
            }
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        refreshHandler();
    }, [category, duration]);



    return trending.length>0 ? (
    <div className='w-screen h-screen'>
        
        <div className='px-[5%] w-full flex items-center justify-between'>
            <h1 className='text-2xl text-zinc-400 font-semibold'>
                <i onClick={()=>navigate(-1)} class="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "}Trending</h1>

            <div className='flex items-center w-[80%]'>
                <Topnav/>
                <Dropdown 
                    title="Category" 
                    options={["movie", "tv", "all"]} 
                    func={(e)=>setCategory(e.target.value)}
                />
                <div className='w-[2%]'></div>
                <Dropdown 
                    title="Duration" 
                    options={["week", "day"]} 
                    func={(e)=>setDuration(e.target.value)}
                />
            </div>
        </div>

        <div className='w-full'>
            <InfiniteScroll
                dataLength={trending.length}
                next={getTrending()}         //what to do id data is finished
                hasMore={hasmore}
                loader={<Loading/>}  //if data is coming
            >
                <Cards data={trending} title={category}/>
            </InfiniteScroll>
        </div>

    </div>
    ) : (
        <Loading/>
    )
}

export default TrendingPage