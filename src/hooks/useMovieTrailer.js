import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchMovieTrailer =(id)=>{

  console.log("movie ID", id)
    // const id = queryKey[1];
    return api.get(`/movie/${id}/videos?language=en-US`)    
    
}





export const useMovieTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["Movie-Trailer", id],
    queryFn: () => fetchMovieTrailer(id),
    // queryFn: fetchMovieTrailer,  // 이렇게만 하면 404 에러 나옴 id 값을 줘야하나 봄 
    select: result => result.data,
    enabled: !!id, // id가 존재할 때만 쿼리 실행
  });
};
