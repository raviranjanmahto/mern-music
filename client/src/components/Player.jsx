import { assets } from "../assets/assets";
import { usePlayer } from "../context/PlayerContext";

const Player = () => {
  const {
    seekBg,
    seekBar,
    track,
    isPlaying,
    play,
    pause,
    time,
    prevPlay,
    nextPlay,
    playShuffle,
    seekSong,
    volumeControl,
    volume,
    volumeBar,
  } = usePlayer();

  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt='Mini player icon' />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img
            onClick={playShuffle}
            className='w-4 cursor-pointer'
            src={assets.shuffle_icon}
            alt='Shuffle icon'
          />
          <img
            onClick={prevPlay}
            className='w-4 cursor-pointer'
            src={assets.prev_icon}
            alt='prev icon'
          />
          {!isPlaying && (
            <img
              onClick={play}
              className='w-4 cursor-pointer'
              src={assets.play_icon}
              alt='play icon'
            />
          )}
          {isPlaying && (
            <img
              onClick={pause}
              className='w-4 cursor-pointer'
              src={assets.pause_icon}
              alt='pause icon'
            />
          )}
          <img
            onClick={nextPlay}
            className='w-4 cursor-pointer'
            src={assets.next_icon}
            alt='next icon'
          />
          <img
            className='w-4 cursor-pointer'
            src={assets.loop_icon}
            alt='loop icon'
          />
        </div>
        <div className='flex items-center gap-5'>
          <p>{time.currentTime}</p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'
          >
            <hr
              ref={seekBar}
              className='h-2 border-none w-0 bg-green-800 rounded-full'
            />
          </div>
          <p>{time.totalTime}</p>
        </div>
      </div>
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={assets.plays_icon} alt='' />
        <img className='w-4' src={assets.mic_icon} alt='' />
        <img className='w-4' src={assets.queue_icon} alt='' />
        <img className='w-4' src={assets.speaker_icon} alt='' />
        <img className='w-4' src={assets.volume_icon} alt='' />
        <div
          onClick={volumeControl}
          ref={volumeBar}
          className='w-20 bg-slate-50 h-2 rounded cursor-pointer'
        >
          <div
            className='h-full bg-green-800 rounded-full'
            style={{ width: `${volume * 100}%` }}
          ></div>
        </div>
        <img className='w-4' src={assets.mini_player_icon} alt='' />
        <img className='w-4' src={assets.zoom_icon} alt='' />
      </div>
    </div>
  );
};

export default Player;
