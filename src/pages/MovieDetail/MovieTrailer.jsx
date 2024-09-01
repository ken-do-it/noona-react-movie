import React from 'react';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';
import { Spinner, Alert, Modal, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';

const MovieTrailer = ({ id, show, handleClose }) => {
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
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1, // 자동 재생
      },
    };

    // 비디오 ID가 올바른지 확인
    console.log("YouTube Video ID:", data?.key);

    // 모달 콘텐츠 렌더링 함수
    const modalContent = () => {
      if (!data || data.results.length === 0) {
        return (
          <Alert key="danger" variant="danger">
            There is no trailer for this video
          </Alert>
        );
      }
      return (
        <YouTube
          videoId={data.results[0].key}
          opts={opts}
          className="youtube-frame"
        />
      );
    };

    return (
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Watch Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent()}
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
