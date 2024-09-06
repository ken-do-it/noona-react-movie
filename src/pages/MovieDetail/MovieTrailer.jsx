import React from 'react';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';
import { Spinner, Alert, Modal, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';

const MovieTrailer = ({ id, show, handleClose }) => {
  const { data, isLoading, isError, error } = useMovieTrailerQuery(id); // ID로 트레일러 데이터를 가져옴

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

  // YouTube 플레이어 설정 옵션
  const opts = {
    width: '711',
    height: '400',
    playerVars: {
      autoplay: 1, // 자동 재생 활성화
    },
  };

  // 트레일러 키 (비디오 ID)
  const trailerKey = data?.results?.[0]?.key;
  console.log("YouTube Video ID:", trailerKey);

  // 비디오 준비 완료 시 실행되는 함수
  const onPlayerReady = event => {
    event.target.playVideo(); // 비디오가 준비되면 자동 재생
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>예고편 보기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(!data || data.results.length === 0) ? (
          <Alert key="danger" variant="danger">
            해당 영화의 예고편이 없습니다.
          </Alert>
        ) : (
          <YouTube
            videoId={trailerKey ? trailerKey : ""}
            opts={opts}
            className="youtube-frame"
            onReady={onPlayerReady} // 비디오 준비되면 실행
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieTrailer;
