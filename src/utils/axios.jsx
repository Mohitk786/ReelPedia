import axios from "axios";

const instace = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmI1MDk4MWE5ZTIwYjA5YTJjMWJjYmE0M2RiNjdiOSIsInN1YiI6IjY1ZTA2MDhiYTgwNjczMDE2MWE4NDFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tm2Yw9cu7uSzve56fEV7X9eLw5L_A0ZIEfsYyT7drlY'
    }
})

export default instace;