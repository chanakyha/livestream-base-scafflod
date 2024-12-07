"use client";

import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { ABI, contractAddress } from "~~/contracts/streamcontractInfo";
import { db } from "~~/firebase";

const MainContext = createContext({});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const account = useAccount();
  const { writeContract } = useWriteContract();

  useEffect(() => {
    if (account.isConnected) {
      const docRef = doc(db, "users", account?.address!);

      (async () => {
        const docExits = await getDoc(docRef);
        if (docExits.exists()) return;
        setDoc(
          docRef,
          {
            walletAddress: account?.address,
          },
          { merge: true },
        )
          .then(() => {
            try {
              writeContract({
                address: contractAddress,
                abi: ABI,
                functionName: "registerStreamer",
                args: [],
              });

              console.log("Streamer Registered");
              toast.success("User Registered Successfully and Streamer mode enabled");
            } catch (e) {
              console.error("Error registering streamer:", e);
            }

            console.log("Added to db");
          })
          .catch(err => {
            console.error("Adding to Database Error", err);
          });
      })();
    }
  }, [account]);

  return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
};

export default MainProvider;

export function useAuth() {
  return useContext(MainContext);
}
