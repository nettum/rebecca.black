import { useState, useEffect } from 'react';

import data from './../../data/videos.json';
import './App.css';

const App = () => {
  const [ seenVideos, setSeenVideos ] = useState([]);
  const [ currentVideo, setCurrentVideo ] = useState(null);

  const dayNumber = 1; //new Date().getDay();
  const dayData = data.find(day => day.daynumber === dayNumber);

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
      <main className={`day${dayNumber}`}>
        <h2 dangerouslySetInnerHTML={{ __html: dayData.text }} />
        {dayNumber !== 5 && <p>But fear not, here is a musicvideo about {dayData.dayname}s</p>}
        <h3>{currentVideo.artist} - {currentVideo.song}</h3>
        {dayNumber !== 5 && <button onClick={changeSong}>I don't like this song,<br />gimme another one!</button>}
        <div className="youtube-wrapper">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${currentVideo.youtubeid}`}
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
