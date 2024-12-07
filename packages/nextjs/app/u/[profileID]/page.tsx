import LiveChatBot from "./chatbot";
import { DemoPlayer } from "./streamplayer";
import { getSrc } from "@livepeer/react/external";
import { Livepeer } from "livepeer";
import { getUserDataUsingWalletAddress } from "~~/utils/actions";

const StreamerPage = async ({
  params: { profileID },
}: {
  params: {
    profileID: string;
  };
}) => {
  const streamerInfo = (await getUserDataUsingWalletAddress(profileID)) as Streamer;

  const getPlaybackSource = async (playbackId: string) => {
    const apiKey = process.env.NEXT_PUBLIC_LIVEPEER_APIKEY;

    const livepeer = new Livepeer({ apiKey });

    const playbackInfo = await livepeer.playback.get(playbackId);

    const src = getSrc(playbackInfo.playbackInfo);
    return src;
  };

  const src = await getPlaybackSource(streamerInfo?.playbackID!);
  console.log(src);

  return (
    <div className="grid grid-cols-3 gap-2 p-4 mx-auto max-w-8xl md:p-16 mt-28">
      <div className="col-span-2 p-2 border rounded-md">
        <DemoPlayer src={src} />
      </div>
      <div className="">
        <LiveChatBot streamerID={profileID} />
      </div>
    </div>
  );
};

export default StreamerPage;
