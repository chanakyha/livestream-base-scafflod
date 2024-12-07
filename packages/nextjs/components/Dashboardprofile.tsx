"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { writeContract } from "@wagmi/core";
import { readContract } from "@wagmi/core";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import { ABI, contractAddress } from "~~/contracts/streamcontractInfo";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { formatWalletAddress } from "~~/utils/actions";

const Dashboardprofile = () => {
  const { address, isConnected } = useAccount();
  const [payoutBalance, setPayoutBalance] = useState<number>();

  useEffect(() => {
    (async () => {
      if (!isConnected) return;
      const result = await readContract(wagmiConfig, {
        abi: ABI,
        address: contractAddress,
        functionName: "getStreamerBalance",
        args: [address as `0x${string}`],
      });

      setPayoutBalance(Number(result));
    })();
  }, [address, isConnected]);

  const payout = () => {
    toast.loading(<b>Undergoing Payout...</b>, {
      id: "payout",
    });
    writeContract(wagmiConfig, {
      abi: ABI,
      address: contractAddress,
      functionName: "requestPayout",
    })
      .then(hash => {
        toast.success(<b>Payout added to wallet</b>, {
          id: "payout",
        });

        console.log(hash);
      })
      .catch(e => {
        toast.error(<b>Error adding to payout</b>, {
          id: "payout",
        });
        console.log(e);
      });
  };

  return (
    <div className=" w-1/2 items-center ml-16 flex flex-col gap-y-14">
      <div className="flex items-center justify-center">
        {isConnected && (
          <Image
            src={`https://robohash.org/${address}?set=set5`}
            width={1920}
            height={1080}
            alt="PROFILE IMAGE"
            className="w-64 h-64 bg-yellow-300 rounded-full hover:border-4 hover:border-[#00FF00] border-foreground/20 hover:shadow-xl hover:shadow-[#00FF00]/25"
          />
        )}
      </div>
      <h1>User: {formatWalletAddress(address ? address : "")}</h1>
      <div className="bg-[#121212] items-center p-3 w-full">
        <button onClick={payout} className="text-2xl w-full text-center">
          Payout: {payoutBalance ? payoutBalance / 1000000000000000000 : 0} ETH
        </button>
      </div>
    </div>
  );
};

export default Dashboardprofile;
