import React from 'react';
import { Form } from 'react-bootstrap';
import './MovieFilter.style.css';  // CSS 파일 가져오기

const MovieFilter = ({ sortOrder, handleSortOrderChange, genre, handleGenreChange }) => {
  return (
    <div className="movie-filter">
      {/* Filter Section */}
      <Form.Group controlId="sortOrder">
        <Form.Label>Sort by Popularity</Form.Label>
        <Form.Control as="select" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="popularity_desc">Most Popular</option>
          <option value="popularity_asc">Least Popular</option>
        </Form.Control>
      </Form.Group>

      {/* Genre Filter */}
      <Form.Group controlId="genreFilter" className="mt-3">
        <Form.Label>Filter by Genre</Form.Label>
        <Form.Control as="select" value={genre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default MovieFilter;
