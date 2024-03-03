/* eslint-disable import/first */

export {removemovie} from "../reducers/movieSlice"
import { loadmovie } from "../reducers/movieSlice"
import axios from "../../utils/axios"

export const getMovieData = (id) => async (dispatch, getState) =>{
    try{
        const details = await axios.get(`/movie/${id}`)
        const externalId = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const translations = await axios.get(`/movie/${id}/translations`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`)

        let finalData = {
            detail: details.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t=>t.name),
            videos: videos.data.results.find((video)=>video.type === "Trailer"),
            watchProviders: watchProviders.data.results.IN
        };

        dispatch(loadmovie(finalData));
        console.log(finalData);

    }catch(err){
        console.log("Error", err.message)
    }
}