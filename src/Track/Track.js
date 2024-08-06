import React from 'react';
import AudioPlayer from '../AudioPlayer';

const Track = ({ track, onAdd, onRemove, isRemoval, showPreview }) => {
  const addTrack = () => onAdd(track);
  const removeTrack = () => onRemove(track);

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {isRemoval ? (
        <button className="Track-action" onClick={removeTrack}>-</button>
      ) : (
        <button className="Track-action" onClick={addTrack}>+</button>
      )}
       { showPreview && <AudioPlayer previewUrl={track.preview_url} />}  
    </div>
  );
};

export default Track;
