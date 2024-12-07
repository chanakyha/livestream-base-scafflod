"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import {
  BaseFaucetsButton,
  FaucetButton,
  RainbowKitCustomConnectButton,
  SuperchainFaucetButton,
} from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import Logo from '../public/Logo.png'
import { Jura } from "next/font/google";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};
const jura = Jura({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal']
});

const navelem = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];

export const Header=()=>{
  const pathname = usePathname();

  return (
<div className="fixed top-5 z-50 flex items-center justify-center w-full">
  {/* Navigation Section */}
  <div className="w-[90%] bg-[#1C1C1C] h-16 py-0 px-4 flex flex-row justify-center rounded-lg shadow-lg">
  <div className="flex w-full items-center justify-between ">
  <div className="flex flex-row gap-x-12">
    <Image src={Logo} alt='Logo' width={1920} height={1080} className="w-40 h-6" />
    <div className="flex justify-center items-center gap-x-8">
      {navelem.map((elem) => {
        const isActive = pathname === elem.href;
        return (
          <Link href={elem.href} key={elem.href}>
            <h2 className={`${jura.className} ${
              isActive ? "text-[#00FF00] font-bold" : "text-white"
            } m-0 hover:text-[#00FF00]/70 transition-colors`}>
              {elem.label}
            </h2>
          </Link>
        );
      })}
    </div>
    </div>
    <div className="flex items-center gap-x-6">
    <RainbowKitCustomConnectButton />
    <BaseFaucetsButton />
    <FaucetButton />
    </div>
  </div>
</div>
</div>
)
};

{/* // export const HeaderMenuLinks = () => {
//   const pathname = usePathname();

//   return (
//     <>
//       {menuLinks.map(({ label, href, icon }) => {
//         const isActive = pathname === href;
//         return (
//           <li key={href} className="flex flex-row gap-2">
//             <Link
//               href={href}
//               passHref
//               className={`${
//                 isActive ? "bg-secondary shadow-md" : ""
//               } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
//             >
//               {icon}
//               <span>{label}</span>
//             </Link>
//           </li>
//         );
//       })}
//     </>
//   );
// }; */}

// /**
//  * Site header
//  */
// export const Header = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const burgerMenuRef = useRef<HTMLDivElement>(null);
//   useOutsideClick(
//     burgerMenuRef,
//     useCallback(() => setIsDrawerOpen(false), []),
//   );

//   return (
//     <div className="fixed top-5 left-0 right-0 z-20 mb-4">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-row justify-between bg-base-100/80 backdrop-blur-xl py-3 shadow-lg items-center px-4">
//           <HeaderMenuLinks />
//           <div className="flex flex-row gap-2">
//             <RainbowKitCustomConnectButton />
//             <BaseFaucetsButton />
//             <FaucetButton />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BaseLogo = () => {
//   const [isMounted, setIsMounted] = useState(false);
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);
//   const { resolvedTheme } = useTheme();
//   const isDarkMode = resolvedTheme === "dark";
//   return isMounted ? (
//     <Image alt="Base logo" className="cursor-pointer" fill src={`/Base_Symbol_${isDarkMode ? "White" : "Black"}.svg`} />
//   ) : (
//     <div className="w-full h-full rounded-full bg-blue-500"></div>
//   );
// };
