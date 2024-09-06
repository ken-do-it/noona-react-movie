// MovieFilter.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const MovieFilter = ({ sortOrder, handleSortOrderChange, genre, handleGenreChange }) => {
  return (
    <div>
      {/* Filter Section */}
      <Form.Group controlId="sortOrder">
        <Form.Label>Sort by Popularity</Form.Label>
        <Form.Control as="select" value={sortOrder} onChange={handleSortOrderChange}>
          {/* <option value="default">Default</option> */}
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
