import React from 'react';

const AudioPlayer = ({ previewUrl }) => {
  return (
    <div className="AudioPlayer">
      {previewUrl ? (
        <audio controls src={previewUrl}>
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>No preview available</p>
      )}
    </div>
  );
};

export default AudioPlayer;
