import LiveChatBot from "./chatbot";
import { getUserDataUsingWalletAddress } from "~~/utils/actions";

const StreamerPage = async ({
  params: { profileID },
}: {
  params: {
    profileID: string;
  };
}) => {
  const streamerInfo = (await getUserDataUsingWalletAddress(profileID)) as Streamer;

  return (
    <div className="grid grid-cols-3 gap-2 p-4 mx-auto max-w-7xl md:p-16">
      <div className="col-span-2 p-2 border rounded-md">{JSON.stringify(streamerInfo, null, 2)}</div>
      <div className="">
        <LiveChatBot streamerID={profileID} />
      </div>
    </div>
  );
};

export default StreamerPage;
