import { createContext, useContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  // Function to format time with leading zeros
  const formatTime = time => {
    const minutes = time.minute < 10 ? `0${time.minute}` : time.minute;
    const seconds = time.second < 10 ? `0${time.second}` : time.second;
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateSeekBar = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;

      // Ensure duration is a valid number before updating seek bar and time
      if (!isNaN(duration) && seekBar.current) {
        seekBar.current.style.width = `${(currentTime / duration) * 100}%`;

        // Update the current time and total time
        setTime({
          currentTime: {
            second: Math.floor(currentTime % 60),
            minute: Math.floor(currentTime / 60),
          },
          totalTime: {
            second: Math.floor(duration % 60),
            minute: Math.floor(duration / 60),
          },
        });
      }
    };

    // Add the timeupdate event listener to update the seek bar and time
    audio.addEventListener("timeupdate", updateSeekBar);

    // Cleanup function to remove the event listener
    return () => {
      audio.removeEventListener("timeupdate", updateSeekBar);
    };
  }, []);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playWithId = async id => {
    setTrack(songsData[id]);
    await audioRef.current.load();
    await audioRef.current.play();
    setIsPlaying(true);
  };

  const prevPlay = () => {
    if (track.id === 0) playWithId(songsData.length - 1);
    else playWithId(track.id - 1);
  };

  const nextPlay = () => {
    if (track.id === songsData.length - 1) playWithId(0);
    else playWithId(track.id + 1);
  };

  const playShuffle = () => {
    const randomIndex = Math.floor(Math.random() * songsData.length);
    playWithId(randomIndex);
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        isPlaying,
        setIsPlaying,
        time: {
          currentTime: formatTime(time.currentTime),
          totalTime: formatTime(time.totalTime),
        },
        setTime,
        play,
        pause,
        playWithId,
        prevPlay,
        nextPlay,
        playShuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export { PlayerProvider, usePlayer };
