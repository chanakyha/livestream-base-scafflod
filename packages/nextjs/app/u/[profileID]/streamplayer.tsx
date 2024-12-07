import { Src } from "@livepeer/react/*";
import * as Player from "@livepeer/react/player";
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon } from "@heroicons/react/24/outline";

export const DemoPlayer = ({ src }: { src: Src[] | null }) => {
  return (
    <div>
      <Player.Root src={src}>
        <Player.Container>
          <Player.Video title="Live stream" />

          <Player.Controls className="flex items-center justify-center">
            <Player.PlayPauseTrigger className="w-10 h-10">
              <Player.PlayingIndicator asChild matcher={false}>
                <PlayIcon />
              </Player.PlayingIndicator>
              <Player.PlayingIndicator asChild>
                <PauseIcon />
              </Player.PlayingIndicator>
            </Player.PlayPauseTrigger>
          </Player.Controls>
        </Player.Container>
      </Player.Root>
    </div>
  );
};
