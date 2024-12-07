"use client";

import { Jura } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../public/Logo.png";
import {
  BaseFaucetsButton,
  FaucetButton,
  RainbowKitCustomConnectButton,
  SuperchainFaucetButton,
} from "~~/components/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};
const jura = Jura({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

const navelem = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tiers", href: "/tiers" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="fixed top-5 z-50 flex items-center justify-center w-full">
      {/* Navigation Section */}
      <div className="w-[90%] bg-[#1C1C1C] h-16 py-0 px-4 flex flex-row justify-center rounded-lg shadow-lg">
        <div className="flex w-full items-center justify-between ">
          <div className="flex flex-row gap-x-12">
            <Image src={Logo} alt="Logo" width={1920} height={1080} className="w-40 h-6" />
            <div className="flex justify-center items-center gap-x-8">
              {navelem.map(elem => {
                const isActive = pathname === elem.href;
                return (
                  <Link href={elem.href} key={elem.href}>
                    <h2
                      className={`${jura.className} ${
                        isActive ? "text-[#00FF00] font-bold" : "text-white"
                      } m-0 hover:text-[#00FF00]/70 transition-colors`}
                    >
                      {elem.label}
                    </h2>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <RainbowKitCustomConnectButton />
            {/* <BaseFaucetsButton /> */}
            {/* <SwitchTheme /> */}

            <FaucetButton />
          </div>
        </div>
      </div>
    </div>
  );
};
