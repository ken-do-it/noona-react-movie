import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieTrailer = async ({ queryKey }) => {
  const id = queryKey[1];
  
  // API 응답을 확인하기 위해 콘솔 로그 추가
  const response = await api.get(`/movie/${id}/videos?language=en-US`);
  console.log("API Response:", response.data);

  // 트레일러를 필터링
  const trailer = response.data.results.find(video => video.type === 'Trailer');
  console.log("Trailer Data:", trailer);

  return trailer || null;
};

export const useMovieTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["Movie-Trailer", id],
    queryFn: fetchMovieTrailer,
    enabled: !!id, // id가 존재할 때만 쿼리 실행
  });
};
