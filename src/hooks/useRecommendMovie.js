import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


const fetchRecommendMovie =({queryKey}) =>{
    const id = queryKey[1]
    return api.get(`/movie/${id}/recommendations?language=en-US`)
}

export const useRecommendMovieQuery =(id)=>{
    return useQuery ({
        queryKey:["Movie-recommend", id],
        queryFn: fetchRecommendMovie,
        select:(data) => {return data.data}
        
    })
}