import React from 'react';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import ReviewBox from './ReviewBox';
import { Spinner, Alert } from 'react-bootstrap';

const Reviews = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(id);

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

  console.log ("review", data)

  const reviews = data?.data?.results || []; // 리뷰 데이터가 없을 경우 빈 배열로 초기화


  return (
    <div>
      <h3 className='fw-bold'>Reviews</h3>

      {reviews.length === 0 ? (
        <div className='md-5'>0 reviews for this movie</div>
      ) : (
        reviews.map((review, index) => (
          <ReviewBox review={review} key={index} />
        ))
      )}
    </div>
  );
}

export default Reviews;
