// app/components/LivestreamChat.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Send } from "lucide-react";
import { useAccount } from "wagmi";
import { db } from "~~/firebase";
import { formatWalletAddress, getUserDataUsingWalletAddress } from "~~/utils/actions";

// app/components/LivestreamChat.tsx

// app/components/LivestreamChat.tsx

// app/components/LivestreamChat.tsx

// app/components/LivestreamChat.tsx

type Message = {
  id: string;
  fromUser: {
    id: string;
  } | null;
  toUser: {
    id: string;
  } | null;
  message: string;
};

const LivestreamChat = ({ streamerID }: { streamerID: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const account = useAccount();

  const [inputValue, setInputValue] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users", streamerID, "chats"), async result => {
      const data = await Promise.all(
        result.docs.map(async doc => {
          const fromUser = await getUserDataUsingWalletAddress(doc.data().from);
          const toUser = await getUserDataUsingWalletAddress(doc.data().to);

          return {
            id: doc.id,
            fromUser,
            toUser,
            message: doc.data().message,
          };
        }),
      );

      setMessages(data!);
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const lastAtSymbol = value.lastIndexOf("@");
    if (lastAtSymbol !== -1) {
      const query = value.slice(lastAtSymbol + 1);
      setUserQuery(query);
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  };

  const handleUserSelect = (username: string) => {
    const lastAtSymbol = inputValue.lastIndexOf("@");
    const newValue = inputValue.slice(0, lastAtSymbol) + "@" + username + " ";
    setInputValue(newValue);
    setShowUserList(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const collRef = collection(db, "users", streamerID, "chats");
      const chatCount = (await getCountFromServer(collRef)).data().count;

      const dbRef = doc(db, "users", streamerID, "chats", `${account.address}-${chatCount + 1}`);
      const result = setDoc(
        dbRef,
        {
          from: account.address,
          to: streamerID,
          message: inputValue,
        },
        {
          merge: true,
        },
      );

      setInputValue("");
    }
  };

  const highlightMentions = (text: string) => {
    return text.split(" ").map((word, index) => {
      if (word.startsWith("@")) {
        const username = word.slice(1);

        const user = query(collection(db, "users"), where("username", "==", username));

        if (user) {
          return (
            <span key={index} className={`mx-0.5 font-semibold`}>
              {word}
            </span>
          );
        }
      }
      return (
        <span key={index} className="mx-0.5">
          {word}
        </span>
      );
    });
  };

  return (
    <div className="w-72 h-[500px] bg-white rounded-lg flex flex-col shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
        <h2 className="text-gray-800 font-bold text-sm">Live Chat</h2>
      </div>

      {/* Chat Messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto py-2 bg-white">
        {messages.map((message, index) => (
          <div key={message.id} className="px-3 py-1 hover:bg-gray-50">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-6 h-6 relative rounded-full overflow-hidden">
                <Image
                  src={`https://robohash.org/${message.fromUser?.id}`}
                  alt={message.fromUser?.id!}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className={`text-sm font-bold truncate`}>{formatWalletAddress(message.fromUser?.id!)}</span>
                  {message.fromUser?.id === message.toUser?.id && (
                    <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">Host</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 break-words">{highlightMentions(message.message)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="p-2 border-t border-gray-200 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full bg-white text-sm text-gray-800 rounded-md pl-3 pr-8 py-1.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            placeholder="Send a message..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LivestreamChat;