import React, { useState } from 'react';
import './ReviewBox.style.css'

const ReviewBox = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='review-Box'>
      <h5 className='fw-bold'>{review.author}</h5>
      <p className={`textBox ${expanded ? "expanded" : "fold"}`}>
        {review.content}
      </p>
      {review.content.length > 300 ? (
        <button 
          className='more-button' 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "접기" : "더보기"}
        </button>
      ) : null}
    </div>
  );
}

export default ReviewBox;
