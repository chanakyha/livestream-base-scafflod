"use client";

import React from "react";
import { LiveVideo } from "./live-video";
import { Skeleton } from "@/components/ui/skeleton";
import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { Loader, WifiOff } from "lucide-react";

export function Video({ hostName, hostIdentity }: { hostName: string; hostIdentity: string }) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
    track => track.participant.identity === hostIdentity,
  );

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="relative border-b aspect-video group rounded-lg">{content}</div>;
}

export function VideoSkeleton() {
  return (
    <div className="w-full border-x border-background">
      <Skeleton className="w-full h-full rounded-none" />
    </div>
  );
}

function OfflineVideo({ username }: { username: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <WifiOff className="w-10 h-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offline</p>
    </div>
  );
}

function LoadingVideo({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Loader className="w-10 h-10 text-muted-foreground animate-spin" />
      <p className="capitalize text-muted-foreground">{label}</p>
    </div>
  );
}
