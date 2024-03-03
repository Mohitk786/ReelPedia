import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { gettvData, removetv } from '../store/actions/tvActions'
import Loading from './Templates/Loading'
import { Link } from 'react-router-dom'
import Trending from "./Templates/Trending"
import no_Image from "./Templates/no_Image.jpg"

const TvDetails = () => {

  
  const {pathname} = useLocation();
  const navigate = useNavigate()
  const {id} = useParams();
  const dispatch = useDispatch();
  const {info} = useSelector((state)=>state.tv)

  useEffect(()=>{
    dispatch(gettvData(id))
    return () => {
      dispatch(removetv())
    }
  }, [id])

  return info ? (
    <div 
      style={{background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
              backgroundPosition: 'center',
              backgroundSize:"cover",
              backgroundRepeat:"no-repeat"
      }} 
      className='relative w-screen h-[180vh] px-[10%] '>
        
        {/* navigation */}
        <nav className='h-[10vh] w-full text-zinc-100 flex  items-center gap-10  text-2xl'>
          <i onClick={()=>navigate(-1)} class="hover:text-[#6556CD] ri-arrow-left-line"></i>

          <a target='_blank' href={info.detail.homepage}><i class="ri-external-link-line"></i></a>
          <a target='_blank' href={`https://www.wikidata.org/wiki/{${info.externalId?.wikidata_id}}`}><i class="ri-earth-fill"></i></a>
          <a target='_blank' href={`https://www.imdb.com/title/${info.externalId?.imdb_id}/`}>IMDb</a>

        </nav>

      
        {/* poster and details */}
        <div className='relative w-full flex'>
          <img 
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh]  object-cover'
            src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          />

          <div className='content ml-[5%] text-white'>
            <h1 className='text-5xl font-black '>
                {info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}

                <small className='text-2xl font-bold text-zinc-300'>({info.detail.first_air_date.split("-")[0]})</small>
                
            </h1>

            <div className='flex mt-3 mb-5  items-center gap-x-5'>
              <span 
                  className='  w-[5vh] left-[-50%] bottom-[25%] bg-yellow-500 text-xl font-semibold rounded full flex justify-center items-center'
              >
                  {(info.detail.vote_average*10).toFixed()} <sup>%</sup>
              </span>
              <h1 className='font-semibold text-2xl leading-6 w-[60px]'>User Score</h1>
              <h1 >{info.detail.release_date}</h1>
              <h1>{info.detail.genres.map(g=>g.name).join(',')}</h1>
              <h1>{info.detail.runtime}min</h1>

            </div>

            <h1 className='text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>
            
            <h1 className='text-xl mb-3 mt-5'>Overview</h1>
            <p>{info.detail.overview}</p>
            
            <h1 className='text-xl mb-3 mt-5'>Available in</h1>
            <p className='mb-10 '>{info.translations.join(', ')}</p>

            <Link 
              className="p-5 bg-[#6556Cd] rounded-lg" 
              to={`${pathname}/trailer`}
            >
              <i class="text-xl mr-3 ri-play-fill"></i>  
              Play Trailer
            </Link>
                  
          </div>

        </div>


        {/* Part 3 Availbale on platform */}
        <div className='w-[80%] flex flex-col gap-5 mt-10'>
            
            {
              info.watchProviders &&
              info.watchProviders.flatrate && ( 
              <div className='flex  gap-x-10 items-center text-white'>
                <h1>Available on platforms</h1>
                {   
                  info.watchProviders.flatrate.map((w, index) => (
                  <img 
                      key={index}
                      title={w.provider_name}
                      className='h-[5vh] w-[5vh] object-cover rounded-md'
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}/>
                    ))
                }
              </div>)
            }

            {
              info.watchProviders &&
              info.watchProviders.rent && ( 
              <div className='flex  gap-x-10 items-center text-white'>
                <h1>Available on Rent</h1>
                {   
                  info.watchProviders.rent.map((w, index) => (
                  <img
                      key={index}
                      title={w.provider_name}
                      className='h-[5vh] w-[5vh] object-cover rounded-md'
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}/>
                    ))
                }
              </div>)
            }


            {
              info.watchProviders &&
              info.watchProviders.buy && ( 
              <div className='flex  gap-x-10 items-center text-white'>
                <h1>Availavle to buy </h1>
                {   
                  info.watchProviders.buy.map((w, index) => (
                  <img 
                      key={index}
                      title={w.provider_name}
                      className='h-[5vh] w-[5vh] object-cover rounded-md'
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}/>
                    ))
                }
              </div>)
            }

        </div>

        {/* Seasons */}
         {/* Recommendation part*/}
          <hr className='mt-10 mb-5 border-none h-[1px] bg-zinc-500'/>
          <h1 className='text-2xl font-semibold text-white'>Seasons</h1>
          {info.detail.seasons && <div className='w-[100%] flex overflow-y-hidden mb-5 p-5' >
            { 
              info.detail.seasons.map((season, index)=>(
                <div className='w-[15vh] mr-[10%] cursor-pointer'>
                  <img 
                      className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] min-w-[14vw] object-cover'
                      src={`https://image.tmdb.org/t/p/original/${season.poster_path || season.backdrop_path || season.profile_path || no_Image}`}
                  />
                  
                  <h1 className='text-2xl text-zinc-300 mt-3 font-semibold overflow-y-auto'>
                      {season.name || season.title || season.original_name || season.original_title}
                  </h1>
                </div>
              ))
            }
          </div>}

        
        
         {/* Recommendation part*/}
        <hr className='mt-10 mb-5 border-none h-[1px] bg-zinc-500'/>
        <h1 className='text-2xl font-semibold text-white'>Similar to "{info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}"</h1>
        <Trending data={info.recommendations.length ? info.recommendations : info.similar}/>
        
        <Outlet/>

    </div>
  ) : (
    <Loading/>
  )
}

export default TvDetails