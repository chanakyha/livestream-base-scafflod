"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ShowAllUsers from "~~/components/mainpage/ShowAllUsers";
import { Address } from "~~/components/scaffold-eth";
import { Header } from "~~/components/Header";
import Hero from "~~/components/Hero";
import Banner from '~~/components/Banner'

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <main className="h-screen w-full overflow-x-hidden">
      <Hero />
      {/* <Image src={Banner} alt='Logo' width={1920} height={1080} className="w-full h-10" /> */}
      <Banner />
      <ShowAllUsers />
    </main>
  );
};

export default Home;
