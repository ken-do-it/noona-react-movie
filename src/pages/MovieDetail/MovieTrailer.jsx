import React from 'react';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';
import { Spinner, Alert, Modal, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useMediaQuery } from 'react-responsive'; // 화면 크기 기반 조건부 렌더링
import './MovieTrailer.style.css'; // 스타일 파일 임포트

const MovieTrailer = ({ id, show, handleClose }) => {
  const { data, isLoading, isError, error } = useMovieTrailerQuery(id);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // 모바일 여부 확인

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

  // YouTube 플레이어 설정 옵션 (화면 크기에 따라 다른 크기 적용)
  const opts = isMobile
    ? {
        width: '100%',  // 모바일 화면일 경우 100% 너비
        height: 'auto',
        playerVars: {
          autoplay: 1, 
        },
      }
    : {
        width: '711',   // 데스크탑일 경우 고정된 크기
        height: '400',
        playerVars: {
          autoplay: 1,
        },
      };

  // 트레일러 키 (비디오 ID)
  const trailerKey = data?.results?.[0]?.key;

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
            onReady={onPlayerReady}
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
