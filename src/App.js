import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import PlayList from './PlayList/PlayList';
import SearchResults from './SearchResults/SearchResults';
import Spotify from './util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState('New PlayList');
  const [playListTracks, setPlayListTracks] = useState([]);

  const addTrackToPlayList = (track) => {
    if (!playListTracks.some(t => t.id === track.id)) {
      setPlayListTracks([...playListTracks, track]);
    }
  };

  const removeTrackFromPlayList = (track) => {
    setPlayListTracks(playListTracks.filter(t => t.id !== track.id));
  };

  const updatePlayListName = (name) => {
    setPlayListName(name);
  };

  const savePlaylist = () => {
    const trackUris = playListTracks.map(track => track.uri);
    Spotify.savePlaylist(playListName, trackUris).then(() => {
      setPlayListName('New PlayList');
      setPlayListTracks([]);
    });
  };

  const search = (term) => {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults);
    });
  };

  return (
    <div className="App">
      <header>
        <h1>The Ultimate Add Your Spotify PlayList App</h1>
      </header>
      <div className="frames">
        <div className="border-container">
          <div className="border-half">
            <SearchBar onSearch={search} />
            <SearchResults tracks={searchResults} onAdd={addTrackToPlayList} />
          </div>
          <div className="border-half">
            <input
              placeholder="New PlayList Name"
              value={playListName}
              onChange={(e) => updatePlayListName(e.target.value)}
            />
            <PlayList tracks={playListTracks} onRemove={removeTrackFromPlayList} />
            <button onClick={savePlaylist}>Save To Spotify</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
