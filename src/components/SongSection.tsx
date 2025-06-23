
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface SongSectionProps {
  onBack: () => void;
}

const SongSection = ({ onBack }: SongSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseInt(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-pink-girly hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-inter font-medium">Back</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-8">
          Your Special Song
        </h2>

        {/* Album Art */}
        <div className="w-80 h-80 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-pink-girly/20 to-purple-girly/20 border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <Music className="w-20 h-20 text-pink-girly mx-auto mb-4" />
            <p className="text-gray-300 font-inter">Album Artwork</p>
          </div>
        </div>

        {/* Song Info */}
        <div className="mb-8">
          <h3 className="text-2xl font-playfair font-bold text-white mb-2">
            Song Title
          </h3>
          <p className="text-gray-300 font-inter">Artist Name</p>
        </div>

        {/* Audio Player */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <audio
            ref={audioRef}
            src="" // Placeholder - user will add their audio file
            preload="metadata"
          />

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercentage}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ff6b9d 0%, #ff6b9d ${progressPercentage}%, #374151 ${progressPercentage}%, #374151 100%)`
                }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={togglePlay}
              className="w-14 h-14 bg-gradient-to-r from-pink-girly to-purple-girly rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform duration-300"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-pink-girly hover:text-white transition-colors duration-300"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ff6b9d 0%, #ff6b9d ${isMuted ? 0 : volume * 100}%, #374151 ${isMuted ? 0 : volume * 100}%, #374151 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongSection;
