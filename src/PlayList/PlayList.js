// PlayList.js
import React from 'react';
import TrackList from '../TrackList/TrackList';
const PlayList = ({tracks, onRemove}) => {
  return (
    <div>
      <h2>PlayList</h2>
      {/* TrackList component for the playList can be added here */}

      <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true}/>
    </div>
  );
};

export default PlayList;