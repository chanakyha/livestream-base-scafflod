import React, { useEffect, useRef, useState } from "react";
import { FullscreenControl } from "./fullscreen-control";
import { VolumeControl } from "./volume-control";
import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEventListener } from "usehooks-ts";

export function LiveVideo({ participant }: { participant: Participant }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(track => track.participant.identity === participant.identity)
    .forEach(track => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={wrapperRef} className="relative flex h-full">
      <video ref={videoRef} width="" className="" />
      <div className="absolute top-0 w-full h-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex items-center justify-between w-full px-4 h-14 bg-gradient-to-r from-neutral-900">
          <VolumeControl onChange={onVolumeChange} value={volume} onToggle={toggleMute} />
          <FullscreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
        </div>
      </div>
    </div>
  );
}
