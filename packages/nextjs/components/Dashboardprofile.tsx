"use client";
import { useAccount } from "wagmi";
import { formatWalletAddress } from "~~/utils/actions";


import Image from "next/image";

const Dashboardprofile = () => {
  
  const { address,isConnected } = useAccount();
  return (
    <div className=" w-1/2 items-center ml-16 flex flex-col gap-y-14">
      <div className="flex items-center justify-center">
        {isConnected && (
          <Image
            src={`https://robohash.org/${address}?set=set2`}
            width={1920}
            height={1080}
            alt="PROFILE IMAGE"
            className="w-64 h-64 bg-yellow-300 rounded-full hover:border-4 hover:border-[#00FF00] border-foreground/20 hover:shadow-xl hover:shadow-[#00FF00]/25"
          />
        )}
      </div>
      <h1>User: {formatWalletAddress(address ?address : "")}</h1>
      {/* <div className="bg-[#121212] items-center p-3 w-full">
        <h1 className="text-2xl text-center">Dashboard</h1>
      </div> */}
    </div>
  );
};

export default Dashboardprofile;
