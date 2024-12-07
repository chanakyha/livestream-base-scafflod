"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { db } from "~~/firebase";
import { createLiveID } from "~~/utils/ingress";import { Copy } from "lucide-react";


const ShowKey = () => {
  const [secretKey, setSecretKey] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) return;

    const docRef = doc(db, "users", address!);

    const unsub = onSnapshot(docRef, result => {
      if (result.exists()) {
        const data = result.data();
        console.log(data);

        setSecretKey(data?.streamKey);
      }
    });
  }, [address, isConnected]);

  return (
    <div>
      {isConnected ? (
        <button onClick={() => setIsOpen(true)} className="btn-secondary">
          Show Stream Key
        </button>
      ) : null}

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-full">
          <div className="bg-black p-6 rounded-lg max-w-md w-3/5">
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Stream URL</label>
                <div className="flex gap-2">
                  <input
                    value={`rtmp://rtmp.livepeer.com/live`}
                    readOnly
                    className="border p-2 flex-1 text-black bg-gray-100 rounded-lg"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`rtmp://rtmp.livepeer.com/live`);
                      toast.success("Stream URL Copied to Clipboard");
                    }}
                    className="text-black bg-[#00FF00] w-1/6 rounded-lg"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2">Stream Secret Key</label>
                <div className="flex gap-2">
                  <input value={secretKey} readOnly className="border p-2 flex-1 text-black bg-gray-100 rounded-lg" />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(secretKey!);
                      toast.success("Stream Key Copied to Clipboard");
                    }}
                    className="mx-2"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button className="btn-secondary text-white" onClick={() => createLiveID(address as `0x${string}`)}>
                Create Key
              </button>
              <button onClick={() => setIsOpen(false)} className="bg-red-600 text-black rounded-lg w-1/6 h-8">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowKey;
