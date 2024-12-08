import LiveChatBot from "./chatbot";
import { PlayerWithControls } from "./streamplayer";
import { getSrc } from "@livepeer/react/external";
import { Livepeer } from "livepeer";
import SubscribeButton from "~~/components/Likebutton";
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

  return (
    <div className="grid grid-cols-4 gap-2 p-4 mx-auto mt-28">
      <div className="col-span-3 flex flex-col items-center justify-center">
        <PlayerWithControls src={src} />
        <div className="w-full flex justify-between flex-row">
          <h1 className={`text-left w-full text-[#00FF00] text-3xl font-semibold`}>{streamerInfo?.streamTitle}</h1>
          <SubscribeButton />
        </div>
      </div>
      <LiveChatBot streamerID={profileID} />
    </div>
  );
};

export default StreamerPage;
