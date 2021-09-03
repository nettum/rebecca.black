import { useState, useEffect } from 'react';

import data from './../../data/videos.json';
import './App.css';

const App = () => {
  const [ seenVideos, setSeenVideos ] = useState([]);
  const [ currentVideo, setCurrentVideo ] = useState(null);

  const dayNumber = new Date().getDay();
  const dayData = data.find(day => day.day === dayNumber);

  const getRandomArrayElement = (arr) => arr[Math.floor(Math.random()*arr.length)];

  useEffect(() => {
    const current = getRandomArrayElement(dayData.songs);
    setCurrentVideo(current);
    setSeenVideos([current]);
  }, [dayData]);

  const changeSong = () => {
    let current = null;
    if (seenVideos.length === dayData.songs.length) {
      current = getRandomArrayElement(dayData.songs);
      setSeenVideos([current]);
    } else {
      const availVideos = dayData.songs.filter(song => !seenVideos.includes(song));
      current = getRandomArrayElement(availVideos);
      setSeenVideos([...seenVideos, current]);
    }
    setCurrentVideo(current);
  };

  if (currentVideo === null) return null;

  return (
    <div className="container">
      <header>
        <h1>Is it friday yet?</h1>
      </header>
      <main>
        <p>{dayData.text}</p>
        <p>{currentVideo.artist} - {currentVideo.song}</p>
        {dayNumber !== 5 && <button onClick={changeSong}>Ny sang!</button>}
        <div className="youtube-wrapper">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${currentVideo.youtube_id}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </main>
    </div>
  );
}

export default App;
