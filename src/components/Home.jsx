import React, { useState, useEffect } from 'react'
import { Sidenav } from './Templates/Sidenav'
import Topnav from './Templates/Topnav'
import axios from '../utils/axios'
import { Header } from './Templates/Header'
import Trending from './Templates/Trending'
import Dropdown from './Templates/Dropdown'
import Loading from './Templates/Loading'

const Home = () => {
    document.title="HomePage"

    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("all");

    const getWallpaper = async()=>{
        try{
            const data = await axios.get(`/trending/all/day`)
            //getting random value from the size of array of wallpaers 
            let randomWall = (Math.random()*data.data.results.length).toFixed(); 

            //randomWall is treated as index to find random wallpaper
            randomWall = data.data.results[randomWall]; 
            setWallpaper(randomWall);

        }catch(err){
            console.log(err.message)
        }
    };


    const getTrending = async()=>{
        try{
            const data = await axios.get(`/trending/${category}/day`)
            setTrending(data.data.results);

        }catch(err){
            console.log(err.message)
        }
    };


    useEffect(()=>{
        getTrending();
        !wallpaper && getWallpaper();
    }, [category])


    return wallpaper && trending ? (
        <>    
            <Sidenav/>
            
            
            <div className='w-[80%] h-full overflow-x-hidden overflow-auto'>
                
                <Topnav/>
                <Header data={wallpaper} />
                
                <div className='p-5 flex justify-between'>
                    <h1 className='text-3xl font-semibold text-zinc-400'>Trending</h1>
                    <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=>setCategory(e.target.value)}/>
                </div>
                
                <Trending data={trending}/>
                
            </div>
       
        </>
    ): <Loading/>
}

export default Home