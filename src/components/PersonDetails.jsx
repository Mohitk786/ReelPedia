import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useLocation, useNavigate, useParams } from 'react-router-dom'
import { getpersonData, removeperson } from '../store/actions/personActions'
import Loading from './Templates/Loading'
import { Link } from 'react-router-dom'
import Trending from "./Templates/Trending"
import Dropdown from './Templates/Dropdown'


  

const PersonDetails = () => {
  
  const {pathname} = useLocation();
  const navigate = useNavigate()
  const {id} = useParams();
  const dispatch = useDispatch();
  const {info} = useSelector((state)=>state.person)
  const [category, setCategory] = useState("movie");
  
  useEffect(()=>{
    dispatch(getpersonData(id))
    return () => {
      dispatch(removeperson())
    }
  }, [id])

  return info ? (
    <div className='w-screen px-[15%] h-[150vh] flex flex-col bg-[#1F1E24]'>

        <nav className='h-[10vh] w-full text-zinc-100 flex  items-center gap-10  text-2xl'>
          <i onClick={()=>navigate(-1)} class="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"></i>
        </nav>


        {/* Left Poster and details */}
        <div className='w-full flex'> 
          <div className='w-[20%] '>
            
            <img 
              className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh]  object-cover'
              src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
              />
            <hr className='mt-10 mb-5 border-none h-[1px] bg-zinc-500'/>

            <div className='text-xl text-white flex gap-x-5'>
              <a target='_blank' href={`https://www.wikidata.org/wiki/{${info.externalId.wikidata_id}}`}><i class="ri-earth-fill"></i></a>
              <a target='_blank' href={`https://www.facebook.com/{${info.externalId.facebook_id}}`}><i class="ri-facebook-fill"></i></a>
              <a target='_blank' href={`https://www.instagram.com/{${info.externalId.instagram_id}}`}><i class="ri-instagram-fill"></i></a>
              <a target='_blank' href={`https://www.twitter.com/{${info.externalId.twitter}}`}><i class="ri-twitter-fill"></i></a>
            </div>

            {/* Iformation */}
            <h1 className='text-2xl text-zinc-400 mt-5 font-semibold'>Known for</h1>
            <h1 className='text-lg text-zinc-400 '>
              {info.detail.known_for_department}
            </h1>
            

            <h1 className='text-2xl text-zinc-400  mt-3  font-semibold'>Gender</h1>
            <h1 className='text-lg text-zinc-400'>
              {info.detail.gender===2 ? "Male" : "Female"}
            </h1>
            


            <h1 className='text-2xl text-zinc-400  mt-3  font-semibold'>BirthDay</h1>
            <h1 className='text-lg text-zinc-400'>
              {info.detail.birthday}
            </h1>

           { info.detail.deathday && <div>  
              <h1 className='text-2xl text-zinc-400  mt-3  font-semibold'>Death Date</h1>
              <h1 className='text-lg text-zinc-400'>
                {info.detail.deathday}
              </h1>
            </div>}

            <h1 className='text-2xl text-zinc-400  mt-3  font-semibold'>Place Of Birth</h1>
            <h1 className='text-lg text-zinc-400'>
              {info.detail.place_of_birth}
            </h1>

            <h1 className='text-2xl text-zinc-400  mt-3  font-semibold'>Also Known as</h1>
            <h1 className='text-lg text-zinc-400'>
              {info.detail.also_known_as.join(",  ")}
            </h1>


          </div>

          {/* details and informations */}
          <div className='w-[80%] ml-[5%]'>
            <h1 className='text-4xl text-zinc-400 my-5 font-black'> {info.detail.name}</h1>
             
            <h1 className='text-xl text-zinc-400  mt-3  font-semibold'>Biography</h1>
            <p className='mt-2 text-zinc-400'>
              {info.detail.biography}
            </p>
            
            <h1 className='text-lg text-zinc-400 my-5 font-black'>Known For</h1>
            <Trending data={info.combinedCredits.data.cast}/>


            <div className='w-full flex justify-between'>
              <h1 className='text-xl text-zinc-400  mt-3  font-semibold'>Acting</h1>
              <Dropdown title="Category" options={["tv", "movie"]} func={(e)=> setCategory(e.target.value)}/>
            </div>

            <div className='list-disc w-full h-[50vh] mt-5 text-zinc-400 overflow-x-hidden overflow-y-auto shadow-xl shadow-white/30 border-2 border-zinc-700 p-5'>
              
              {
                info[category == "movie" ? category+"_credits" : category+"Credits"].data.cast.map((cast, index)=>(

                  <li key={index} className='hover:text-white duration-300 mt-3 cursor-pointer'>
                    <Link to={`/${category}/details/${cast.id}`}>
                      
                      <span>{cast.name || cast.title || cast.original_name || cast.original_title}</span>
                      <span className='block ml-5'>{cast.character && 
                          `Character Name : ${cast.character}`
                      }</span>

                    </Link>
                  </li>
                ))
              }
              
            </div>

          </div>
        </div>



    </div>
  ): <Loading/>

}

export default PersonDetails