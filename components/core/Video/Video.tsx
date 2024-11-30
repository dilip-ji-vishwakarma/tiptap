"use client";
import React, { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { CgSpinner } from "react-icons/cg";
import { Heading } from '../Heading';

type VideoProps = {
  url: string;
  start?: number; 
  end?: number;  // Keep end to pass from props
  heading: string;
};

export const Video = ({ url, start = 0, end, heading }: VideoProps) => {
  const [loading, setLoading] = useState(true);

  const getVideoId = (url: string) => {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(url);
  
  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      rel: 0,
      controls: 1,
      start: start,
      ...(end ? { end } : { end: start + 1 }),  // End the video after 1 second or custom `end` time
    },
  };

  const onReady = () => {
    setLoading(false);
  };

  const onStateChange = (event: { data: number }) => {
    if (event.data === 1) {  // Playing state
      setLoading(false);
    }
  };

  return (
    <div className='md:flex justify-between items-center md:space-y-0 space-y-5'>
      <Heading className='text-md'>{heading}</Heading>
      <div className="relative aspect-w-16 aspect-h-9 md:max-w-[230px] md:h-[100px] rounded-xl">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <CgSpinner className="animate-spin text-white" size={25} />
          </div>
        )}
        {videoId ? (
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
            className="w-full h-full rounded-xl"
          />
        ) : (
          <p className="text-red-500">Invalid YouTube URL</p>
        )}
      </div>
    </div>
  );
};
