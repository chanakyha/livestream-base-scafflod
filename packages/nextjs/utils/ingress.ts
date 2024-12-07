import { doc, setDoc } from "firebase/firestore";
import { Livepeer } from "livepeer";
import toast from "react-hot-toast";
import { db } from "~~/firebase";

export const createLiveID = async (streamerID: string) => {
  toast.loading("Fetching New Stream Key, and URL", {
    id: "stream-key",
  });
  const apiKey = process.env.NEXT_PUBLIC_LIVEPEER_APIKEY;

  const livepeer = new Livepeer({ apiKey });

  const streamData = {
    name: streamerID,
  };
  try {
    const result = await livepeer.stream.create(streamData);
    console.log(result);

    const docRef = doc(db, "users", streamerID!);

    setDoc(
      docRef,
      {
        playbackID: result.stream?.playbackId,
        streamKey: result.stream?.streamKey,
      },
      {
        merge: true,
      },
    )
      .then(result => {
        toast.success("New Stream Key Fetched", {
          id: "stream-key",
        });
      })
      .catch(err => {
        toast.error("Error Fetching Stream Key and URL", {
          id: "stream-key",
        });
      });

    return result;
  } catch (e) {
    console.log("Error Creating Stream Key");
  }
};
