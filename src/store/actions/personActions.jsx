/* eslint-disable import/first */
export {removeperson} from "../reducers/personSlice"
import axios from "../../utils/axios"
import { loadperson } from "../reducers/personSlice"

export const getpersonData = (id) => async (dispatch, getState) =>{
    try{
        const details = await axios.get(`/person/${id}`)
        const externalId = await axios.get(`/person/${id}/external_ids`)
        const movie_credits = await axios.get(`/person/${id}/movie_credits`)
        const tvCredits = await axios.get(`/person/${id}/tv_credits`)
        const combined_credits = await axios.get(`/person/${id}/combined_credits`)

        
        let finalData = {
            detail: details.data,
            externalId: externalId.data,
            combinedCredits: combined_credits,
            movie_credits: movie_credits,
            tvCredits: tvCredits
        };

        dispatch(loadperson(finalData));
        console.log(finalData);

    }catch(err){
        console.log("Error", err.message)
    }
}