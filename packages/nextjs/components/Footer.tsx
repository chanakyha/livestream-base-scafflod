import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";
import Marquee from "react-fast-marquee";
import Coinbase from "../public/Coinbase.png";
import Base from "../public/Base.png";
import Scaffoldeth2 from "../public/Scaffoldeth2.jpg";
import Image from "next/image";
import { Jura } from "next/font/google";

/**
 * Site footer
 */

const jura = Jura({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});
export const Footer = () => {
  return (
    <div className="w-full h-72 flex flex-col justify-center items-center pt-12 mt-8">
      <h1 className={`${jura.className} text-[#00FF00] text-3xl font-semibold`}>Our Tracks</h1>
      <div className="flex flex-row gap-x-8 items-center h-full justify-center">
        <Marquee direction="right" speed={50} gradient={false}>
          <div className="flex gap-x-16 items-center">
            <Image 
              src={Coinbase}
              alt="Coinbase" 
              width={1920}
              height={1080}
              className="w-96 h-full mx-8"
            />
            <Image 
              src={Base}
              alt="Base" 
              width={1920}
              height={1080}
              className="w-96 h-full mx-8"
            />
            <Image 
              src={Scaffoldeth2}
              alt="Scaffoldeth2" 
              width={1920}
              height={1080}
              className="w-64 h-64 mx-8"
            />
          </div>
        </Marquee>

      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className={`${jura.className} text-[#00FF00] text-3xl font-semibold`}>Technologies Used</h1>
        <div className="flex flex-row items-center justify-center pt-4 pb-12">
          <ul className="flex flex-row items-center justify-center gap-x-8">
            <li>Coinbase</li>
            <li>Base</li>
            <li>Scaffold-ETH</li>
            <li>Wagmi</li>
            <li>NextJS</li>
            <li>TailwindCSS</li>
            <li>Firebase</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
