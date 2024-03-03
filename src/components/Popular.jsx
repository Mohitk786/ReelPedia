import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Topnav from './Templates/Topnav';
import Dropdown from './Templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Templates/Loading';
import Cards from './Templates/Cards';


const Popular = () => {
    
    
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasmore, sethasMore] = useState(true)
    document.title = "Popular "+ category.toLocaleUpperCase()
  
    const getPopular = async()=>{
        try{
            const data = await axios.get(`${category}/popular?page=${page}`)
            const result = data.data.results
            
            if(result.length > 0){
                setPopular((prev) => [...prev, ...result])
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
            if(popular.length === 0)  getPopular();
            else {
                setPage(1)
                setPopular([])
                getPopular()
            }
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        refreshHandler();
    }, [category]);


    return popular.length>0 ? (
        <div className='w-screen h-screen '>
            
            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='text-2xl text-zinc-400 font-semibold'>
                    <i onClick={()=>navigate(-1)} class="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "}Popular</h1>
    
                <div className='flex items-center w-[80%]'>
                    <Topnav/>
                    <Dropdown 
                        title="Category" 
                        options={["movie", "tv", "all"]} 
                        func={(e)=>setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                    
                </div>
            </div>
    
            <InfiniteScroll
                dataLength={popular.length}
                next={getPopular()}         //what to do id data is finished
                hasMore={hasmore}
                loader={<Loading/>}  //if data is coming
            >
                <Cards data={popular} title={category}/>
            </InfiniteScroll>
    
        </div>
        ) : (
            <Loading/>
        )
}

export default Popular