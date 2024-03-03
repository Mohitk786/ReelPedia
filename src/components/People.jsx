import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Topnav from './Templates/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Templates/Loading';
import Cards from './Templates/Cards';

const People = () => {
    
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [people, setpeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasmore, sethasMore] = useState(true)
    document.title = "people "+ category.toLocaleUpperCase()
  
    const getpeople = async()=>{
        try{
            const data = await axios.get(`/person/${category}?page=${page}`)
            const result = data.data.results
            
            if(result.length > 0){
                setpeople((prev) => [...prev, ...result])
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
            if(people.length === 0) getpeople();
            else {
                setPage(1)
                setpeople([])
                getpeople()
            }
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        refreshHandler();
    }, [category]);

  
    return people.length>0 ? (
        <div className='w-screen h-screen '>
            
            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='text-2xl text-zinc-400 font-semibold'>
                    <i onClick={()=>navigate(-1)} class="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"></i>{" "}People<small className='text-sm ml-2 text-zinc-700'> ({category})</small></h1>
    
                <div className='flex items-center w-[80%]'>
                    <Topnav/>
                    
                    
                </div>
            </div>
    
            <InfiniteScroll
                dataLength={people.length}
                next={getpeople()}         //what to do id data is finished
                hasMore={hasmore}
                loader={<h1>Loading...</h1>}  //if data is coming
            >
                <Cards data={people} title="people"/>
            </InfiniteScroll>
    
        </div>
        ) : (
            <Loading/>
        
  )
}

export default People