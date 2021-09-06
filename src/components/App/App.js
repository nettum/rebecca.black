import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

import data from './../../data/videos.json';
import './App.css';

const App = () => {
  const [ seenVideos, setSeenVideos ] = useState([]);
  const [ currentVideo, setCurrentVideo ] = useState(null);
  const [ showTooltip, setShowTooltip ] = useState(false);

  const tooltipRef = useRef(null);

  const dayNumber = new Date().getDay();
  document.body.classList.add(`day${dayNumber}`);
  const dayData = data.find(day => day.daynumber === dayNumber);

  const getRandomArrayElement = (arr) => arr[Math.floor(Math.random()*arr.length)];

  useEffect(() => {
    const current = getRandomArrayElement(dayData.songs);
    setCurrentVideo(current);
    setSeenVideos([current]);
  }, [dayData]);

  const changeSong = () => {
    if (dayNumber === 5) {
      //iframeRef.current.src = `https://www.youtube.com/embed/${currentVideo.youtubeid}?autoplay=1`;
      //return;
    }

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

  const handleTooltipPosition = (e) => {
    if (showTooltip && dayNumber === 5) {
      tooltipRef.current.style.left = `${e.pageX-100}px`;
      tooltipRef.current.style.top = `${e.pageY-35}px`;
    }
  };

  const handleStateChange = (change) => {
    console.log(change);
  }

  return (
    <div className="container">
      <header>
        <h1>Is it friday yet?</h1>
      </header>
      <main>
        <h2 dangerouslySetInnerHTML={{ __html: dayData.text }} />
        {dayNumber !== 5 && <p>But fear not, here are some oldskool music about {dayData.dayname}s</p>}
        <button
          onClick={changeSong}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onMouseMove={handleTooltipPosition}
        >
          I don't like this song,<br />gimme another one!
        </button>
        <YouTube
          videoId={currentVideo.youtubeid}
          containerClassName="youtube-wrapper"
          onStateChange={handleStateChange}
        />
      </main>
      {showTooltip && dayNumber === 5 && <div ref={tooltipRef} className="tooltip">You simple do not change this song!</div>}
    </div>
  );
}

export default App;
