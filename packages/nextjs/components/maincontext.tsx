"use client";

import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { writeContract } from "@wagmi/core";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { base, baseSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { ABI, contractAddress } from "~~/contracts/streamcontractInfo";
import { db } from "~~/firebase";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const MainContext = createContext({});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const account = useAccount();

  useEffect(() => {
    if (account.isConnected) {
      const docRef = doc(db, "users", account?.address!);

      (async () => {
        const docExits = await getDoc(docRef);
        if (docExits.exists()) return;
        toast.loading(<b>Registering Streamer to the chain</b>, {
          id: "streamer",
        });
        setDoc(
          docRef,
          {
            walletAddress: account?.address,
          },
          { merge: true },
        )
          .then(() => {
            writeContract(wagmiConfig, {
              address: contractAddress,
              abi: ABI,
              functionName: "registerStreamer",
              args: [],
            })
              .then(result => {
                toast.success("User Registered Successfully and Streamer mode enabled", {
                  id: "streamer",
                });
              })
              .catch(e => {
                toast.error("Error registering user", {
                  id: "streamer",
                });

                console.log(e);
              });

            console.log("Added to db");
          })
          .catch(err => {
            console.error("Adding to Database Error", err);
          });
      })();
    }
  }, [account]);

  return (
    <MainContext.Provider value={{}}>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
        // @ts-ignore
        chain={base}
      >
        {children}
      </OnchainKitProvider>
    </MainContext.Provider>
  );
};

export default MainProvider;

export function useAuth() {
  return useContext(MainContext);
}
