import React from 'react'
import {useRecommendMovieQuery} from '../../hooks/useRecommendMovie'
import { Spinner, Alert } from 'react-bootstrap'
import {responsive} from '../../constants/responsive'
import MovieSlider from '../../common/MovieSlider/MovieSlider'

const RecommendMovie = ({ id }) => {
    const { data, isLoading, isError, error } = useRecommendMovieQuery(id);

    // API 응답 데이터 확인을 위한 콘솔 로그
    console.log("Recommend Movie Data:", data);

    if (isLoading) {
        return (
            <div className="loading-spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    const movies = data?.results || [];

    return (
        <div>
            <MovieSlider
                title="Recommend Movie"
                movies={movies}
                responsive={responsive}
            />
        </div>
    );
};
export default RecommendMovie