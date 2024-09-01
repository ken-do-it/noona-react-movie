import React from 'react';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';
import { Spinner, Alert, Modal, Button } from 'react-bootstrap';
import YouTube from 'react-youtube'; // YouTube 컴포넌트를 import

const MovieTrailer = ({ id, show, handleClose }) => {
    // useParams를 사용하지 않고 props로 받은 id를 사용
    const { data, isLoading, isError, error } = useMovieTrailerQuery(id); // ID를 훅에 전달

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

    // YouTube 플레이어의 옵션 설정
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1, // 자동 재생
      },
    };

    // 비디오 ID가 올바른지 확인
    console.log("YouTube Video ID:", data?.key);


    

    return (
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Watch Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data ? (
            <YouTube videoId={data.key} opts={opts} />
          ) : (
            <p>No trailer available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default MovieTrailer;
