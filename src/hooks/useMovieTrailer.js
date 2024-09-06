import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchMovieTrailer =(queryKey)=>{
    const id = queryKey[1];
    return api.get(`/movie/${id}/videos?language=en-US`)    
}

// const fetchMovieTrailer = async ({ queryKey }) => {
//   const id = queryKey[1];
//    console.log("Fetching trailer for movie ID:", id);  // undefined


//   // API 응답을 확인하기 위해 콘솔 로그 추가
//   const response = await api.get(`/movie/${id}/videos?language=en-US`);
//   console.log("API Response:", response.data);  // undefined 

//   // 트레일러를 필터링
//   const trailer = response.data.results.find(video => {
//     console.log("Video Type:", video.type); // 각 비디오의 타입을 확인
//     return video.type === 'Trailer' || video.type === 'Teaser' || video.type === 'Clip';
//   });

//   console.log("Trailer Data:", trailer);

//   return trailer || null;
// };

export const useMovieTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["Movie-Trailer", id],
    queryFn: fetchMovieTrailer,
    refetchOnMount:false,
    enabled: !!id, // id가 존재할 때만 쿼리 실행
  });
};
