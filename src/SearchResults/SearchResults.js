import React from 'react';
import TrackList from '../TrackList/TrackList';

const SearchResults = ({ tracks, onAdd }) => {
  return (
    <div className="SearchResults">
      <h2>Songs</h2>
      <TrackList tracks={tracks} onAdd={onAdd} isRemoval={false} /> 
    </div>
  );
};

export default SearchResults;
