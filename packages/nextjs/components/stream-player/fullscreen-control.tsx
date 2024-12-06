"use client";

import React from "react";
import { Hint } from "@/components/hint";
import { Maximize, Minimize } from "lucide-react";

export function FullscreenControl({ isFullscreen, onToggle }: { isFullscreen: boolean; onToggle: () => void }) {
  const Icon = isFullscreen ? Minimize : Maximize;

  const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button onClick={onToggle} className="text-white p-1.5 hover:bg-white/10 rounded-lg">
          <Icon className="w-5 h-5" />
        </button>
      </Hint>
    </div>
  );
}
