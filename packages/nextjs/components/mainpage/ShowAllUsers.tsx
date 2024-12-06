"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Nounstar from "../assets/Nounstars.png";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "~~/firebase";

const ShowAllUsers = () => {
  const collectionRef = collection(db, "users");
  const [users, setUsers] = useState<Streamer[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collectionRef, result => {
      setUsers(
        result.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          } as Streamer;
        }),
      );
    });
  }, [collectionRef]);

  return (
    <div className="container pt-4 mx-auto">
      <div className="flex flex-row gap-x-2">
        {/* <Image src={Nounstar} alt="logoimg" className="h-8 w-7" /> */}
        <h1 className="text-3xl font-semibold text-blue-700">Curated for you</h1>
      </div>
      <h1 className="ml-2">Live Channels you might like</h1>
      <div className="flex flex-wrap justify-center my-8 gap-x-12">
        {users.map((user, index) => {
          return (
            <Link
              href={`/u/${user.id}`}
              key={index}
              className="flex flex-col items-center justify-center h-64 gap-4 p-4 border rounded-lg w-80 border-foreground/20 hover:shadow-xl hover:shadow-blue-700/20"
            >
              {" "}
              <div
                className="flex items-center justify-center w-full h-full"
                style={{
                  backgroundImage: `url(${user.thumbnail})`,
                }}
              >
                {/* <PlayCircleFilled style={{ fontSize: 80 }} /> */}
              </div>
              <div className="flex flex-col items-center w-full">
                <h1>{user.streamTitle ? user.streamTitle : "Untitled Stream"}</h1>
                <h1>{user.username}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAllUsers;
