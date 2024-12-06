"use client";

import React from "react";
import Chatbox from "../Chatbox";
import { Video, VideoSkeleton } from "./video";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { cn } from "@/lib/utils";
import { LiveKitRoom } from "@livekit/components-react";

export function StreamPlayer({ user }: { user: Streamer }) {
  const { identity, name, token } = useViewerToken(user);

  console.log("Identity", identity);
  console.log("name", name);
  console.log("token", token);

  if (!token || !name) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn("grid grid-cols-3 gap-2")}
      >
        <div className="col-span-2">
          <Video hostName={name} hostIdentity={user.id!} />
        </div>
        <Chatbox />
      </LiveKitRoom>
    </>
  );
}

export function StreamPlayerSkeleton() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="col-span-1 pb-10 space-y-4 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
        <VideoSkeleton />
      </div>
    </div>
  );
}
