import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

//useMovieDetailPage.js

    // 영화 세부 정보를 가져오는 함수
    const fetchMovieDetails = ({ id }) => {
        return api.get(`/movie/${id}`);}

    export const useMovieDetailPageQuery =(id)=>{

        return useQuery ({
            queryKey: ['movie-details', id], // React Query에서 사용할 쿼리 키
            queryFn: () => fetchMovieDetails({ id }), // 영화 세부 정보를 가져오는 함수 호출
        })



    // const { id } = useParams(); // URL 파라미터에서 영화 ID 가져오기
    //   queryKey: ['movie-details', id], // React Query에서 사용할 쿼리 키
    //   queryFn: () => fetchMovieDetails({ id }), // 영화 세부 정보를 가져오는 함수 호출
    // });
}


    