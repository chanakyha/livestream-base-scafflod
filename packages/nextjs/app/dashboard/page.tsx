"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { doc, setDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import Dashboardprofile from "~~/components/Dashboardprofile";
import ShowKey from "~~/components/ShowKey";
import { storage } from "~~/firebase";
import { db } from "~~/firebase";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [username, setUsername] = useState("");
  const [streamTitle, setStreamTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dbURL, setDBUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<any>();

  useEffect(() => {
    if (isConnected !== true) return;
    onSnapshot(doc(db, "users", address!), doc => {
      setUsername(doc.data()?.username);
      setStreamTitle(doc.data()?.streamTitle);
      setDBUrl(doc.data()?.thumbnail);
    });
  }, [isConnected, address]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file?.name);
    // edited
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setImageFile(file);
    }
  };

  const uploadImage = async () => {
    const storageRef = ref(storage, address);

    toast.loading(<b>Uploading Image...</b>, {
      id: "thumbnail",
    });

    if (imageFile) {
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Progress function ...
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        error => {
          // Handle unsuccessful uploads
          toast.error(<b>Error Uploading image</b>, {
            id: "thumbnail",
          });
          console.error("Error uploading file:", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
            setDoc(
              doc(db, "users", address!),
              {
                thumbnail: downloadURL,
              },
              {
                merge: true,
              },
            )
              .then(() => {
                toast.success(<b>ImageUploaded...</b>, {
                  id: "thumbnail",
                });
              })
              .catch(err => {
                toast.loading(<b>Error Uploading Image</b>, {
                  id: "thumbnail",
                });
              });

            setImageUrl(downloadURL);
          });
        },
      );
    }
  };

  const changeUsername = async () => {
    toast.loading("Updating Username", {
      id: "username",
    });
    const docRef = doc(db, "users", address!);

    setDoc(
      docRef,
      {
        username,
      },
      {
        merge: true,
      },
    )
      .then(result => {
        toast.success(<b>Username Added Successfully</b>, {
          id: "username",
        });
      })
      .catch(err => {
        toast.error(<b>Error adding username</b>, {
          id: "username",
        });
      });
  };

  const changeStreamTitle = async () => {
    toast.loading("Updating Stream Title", {
      id: "stream-title",
    });
    const docRef = doc(db, "users", address!);

    setDoc(
      docRef,
      {
        streamTitle,
      },
      {
        merge: true,
      },
    )
      .then(result => {
        toast.success(<b>Stream Title Updated Successfully</b>, {
          id: "stream-title",
        });
      })
      .catch(err => {
        toast.error(<b>Error adding Stream Title</b>, {
          id: "stream-title",
        });
      });
  };

  if (!isConnected)
    return (
      <div className="w-screen h-screen flex items-center justify-center">Page not found, Please Connect to wallet</div>
    );

  return (
    <div className="flex flex-row justify-center items-center w-scren px-4 bg-black h-screen">
      <div className="flex flex-row gap-x-16 w-4/5 justify-center items-center mt-16">
        <Dashboardprofile />
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="flex flex-col w-full max-w-lg gap-3 mx-auto">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Edit Username"
                className="p-2 border rounded-md flex-1"
              />
              <button onClick={changeUsername} className="px-4 py-2 bg-[#00FF00] text-black rounded-md">
                Update Username
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={streamTitle}
                onChange={e => setStreamTitle(e.target.value)}
                placeholder="Edit Stream Title"
                className="p-2 border rounded-md flex-1"
              />
              <button
                onClick={changeStreamTitle}
                className="px-4 py-2 bg-[#00FF00] text-black rounded-md hover:bg-[#00FF00]"
              >
                Update Stream Title
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input type="file" onChange={handleImageChange} className="p-2 border rounded-md flex-1 w-1/2" />
              <button
                onClick={uploadImage}
                className="px-4 py-2 bg-[#00FF00] text-black rounded-md hover:bg-[#00FF00] w-1/2"
              >
                Update Stream Thumbnail
              </button>
            </div>

            {!dbURL && imageUrl && (
              <Image width={1920} height={1080} src={imageUrl!} alt="Uploaded Thumbnail" className="mt-4" />
            )}

            {dbURL && !imageUrl && (
              <Image width={1920} height={1080} src={dbURL!} alt="Uploaded Thumbnail" className="mt-4 border-2" />
            )}

            {isConnected && <ShowKey />}
          </div>
        </div>
      </div>
    </div>
  );
}
