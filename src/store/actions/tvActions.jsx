/* eslint-disable import/first */
export {removetv} from "../reducers/tvSlice"
import axios from "../../utils/axios"
import { loadtv } from "../reducers/tvSlice"

export const gettvData = (id) => async (dispatch, getState) =>{
    try{
        const details = await axios.get(`/tv/${id}`)
        const externalId = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const translations = await axios.get(`/tv/${id}/translations`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const watchProviders = await axios.get(`/tv/${id}/watch/providers`)

        let finalData = {
            detail: details.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t=>t.name),
            videos: videos.data.results.find((video)=>video.type === "Trailer"),
            watchProviders: watchProviders.data.results.IN
        };

        dispatch(loadtv(finalData));
        console.log(finalData);

    }catch(err){
        console.log("Error", err.message)
    }
}