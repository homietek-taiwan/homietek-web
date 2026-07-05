"use client";

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function SceneCard({ item }: { item: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    // Only toggle if it's a video
    if (item.image.endsWith('.mp4') && videoRef.current) {
      if (isMuted) {
        setIsMuted(false);
        // Sometimes unmuting requires ensuring play state
        videoRef.current.play().catch(e => console.log('play prevented', e));
      } else {
        setIsMuted(true);
      }
    }
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 ${item.image.endsWith('.mp4') ? 'cursor-pointer' : ''}`}
      onClick={toggleSound}
    >
      {/* Graphic Representation Area */}
      <div className="h-56 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        {item.image.endsWith('.mp4') ? (
          <video 
            ref={videoRef}
            src={item.image}
            autoPlay
            loop
            muted={isMuted}
            preload="auto"
            playsInline
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none -z-0" 
          />
        ) : (
          <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 -z-0" unoptimized />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <span className="material-symbols-outlined text-white text-5xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 drop-shadow-md">
            {item.image.endsWith('.mp4') ? (isMuted ? 'volume_off' : 'volume_up') : item.icon}
          </span>
        </div>
      </div>

      {/* Text Area */}
      <div className="p-8 pointer-events-none bg-white dark:bg-slate-900 z-30 relative">
        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
          {item.desc}
        </p>
      </div>
    </div>
  );
}
