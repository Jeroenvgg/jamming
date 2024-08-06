import React from 'react';
import Track from '../Track/Track';

const TrackList = ({ tracks = [], onAdd, isRemoval, onRemove, showPreview }) => {
  return (
    <div className="TrackList">
      {tracks.map(track => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
          showPreview={showPreview}
        />
      ))}
    </div>
  );
};

export default TrackList;
