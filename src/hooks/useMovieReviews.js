import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 영화 리뷰 데이터를 가져오는 함수
const fetchMovieReviews = ({ queryKey }) => {
    const id = queryKey[1]; // queryKey에서 id를 추출
    return api.get(`/movie/${id}/reviews?language=US`);
}

export const useMovieReviewsQuery = (id) => {
    return useQuery({
        queryKey: ['movie-reviews', id], // React Query에서 사용할 쿼리 키
        queryFn: fetchMovieReviews, // 영화 리뷰 데이터를 가져오는 함수 호출
        // select: (result) => result.data.results, // 리뷰 리스트만 추출
    });
}



