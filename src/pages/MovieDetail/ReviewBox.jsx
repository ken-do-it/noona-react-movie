import React, { useState } from 'react';
import './ReviewBox.style.css'

const ReviewBox = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const maxTextLength = 250; // 최대 표시할 글자 수

  // 리뷰 내용이 250자 이상일 때만 자르고, 그렇지 않으면 전체를 보여줌
  const displayText = expanded ? review.content : review.content.slice(0, maxTextLength);

  return (
    <div className='review-Box'>
      <h5 className='fw-bold'>{review.author}</h5>

      {/* 리뷰 내용 */}
      <p className={`textBox ${expanded ? "expanded" : "fold"}`}>
        {displayText}{review.content.length > maxTextLength && !expanded && '...'}
      </p>

      {/* 150자 이상일 때만 더보기/접기 버튼 표시 */}
      {review.content.length > 150 && (
        <button 
          className='more-button' 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "접기△" : "더보기▽"}
        </button>
      )}
    </div>
  );
}

export default ReviewBox;
