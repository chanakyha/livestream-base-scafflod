"use client";
import { useAccount } from "wagmi";
import { formatWalletAddress } from "~~/utils/actions";


import Image from "next/image";

const Dashboardprofile = () => {
  
  const { address,isConnected } = useAccount();
  return (
    <div className="bg-[#191919] w-1/3 items-center p-4 ml-16 flex flex-col gap-y-20">
      <div className="flex items-center justify-center">
        {isConnected && (
          <Image
            src={`https://robohash.org/${address}?set=set2`}
            width={1920}
            height={1080}
            alt="PROFILE IMAGE"
            className="w-64 h-64 bg-yellow-300 rounded-full hover:border-4 hover:border-blue-700 border-foreground/20 hover:shadow-xl hover:shadow-blue-700/25"
          />
        )}
      </div>
      <h1>User: {formatWalletAddress(address ?address : "")}</h1>
      <div className="bg-[#121212] items-center p-3 w-full">
        <h1 className="text-2xl text-center">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboardprofile;
