"use client";

import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAccount } from "wagmi";
import { db } from "~~/firebase";

const MainContext = createContext({});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const account = useAccount();
  console.log(account);

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
