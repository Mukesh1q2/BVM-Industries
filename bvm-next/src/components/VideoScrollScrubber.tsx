"use client";
import React, { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VideoScrollScrubber = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div className="relative w-full bg-bvm-navy border-y border-white/5 overflow-hidden flex items-center justify-center">
            <video
                ref={videoRef}
                src={src}
                className="w-full h-auto max-h-[80vh] object-contain"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            />

            {/* Mute/Unmute Toggle */}
            <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full transition-all"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Gentle vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(11, 15, 23, 0.7) 100%)' }}
            />
        </div>
    );
};

export default VideoScrollScrubber;
