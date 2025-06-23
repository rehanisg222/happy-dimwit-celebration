
import React, { useState, useRef } from 'react';
import { ArrowLeft, Play, Pause } from 'lucide-react';

interface EditsSectionProps {
  onBack: () => void;
}

const EditsSection = ({ onBack }: EditsSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);
    setDuration(video.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (parseInt(e.target.value) / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
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

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-8">
          Special Edits
        </h2>
        <p className="text-gray-300 font-inter mb-8">
          Memories captured just for you ✨
        </p>

        {/* Video Player */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
          <div className="relative aspect-video bg-gray-900">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              poster="" // Placeholder - user will add their video poster
            >
              <source src="" type="video/mp4" /> {/* Placeholder - user will add their video */}
              Your browser does not support the video tag.
            </video>

            {/* Play Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 bg-gradient-to-r from-pink-girly to-purple-girly rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                >
                  <Play className="w-8 h-8 ml-1" />
                </button>
              </div>
            )}

            {/* Video Controls */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-pink-girly transition-colors duration-300"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-white text-sm min-w-[4rem]">
                      {formatTime(currentTime)}
                    </span>
                    <div className="flex-1">
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
                    <span className="text-white text-sm min-w-[4rem]">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="p-6">
            <h3 className="text-xl font-playfair font-bold text-white mb-2">
              Birthday Edit Video
            </h3>
            <p className="text-gray-300 font-inter">
              A special compilation made with love
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditsSection;
