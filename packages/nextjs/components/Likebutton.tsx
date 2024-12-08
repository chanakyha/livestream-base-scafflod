"use client";
import { useState } from "react";

const SubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <button
      onClick={() => setIsSubscribed(!isSubscribed)}
      className={`px-4 py-2 w-fit rounded-md transition-colors duration-200 ${
        isSubscribed ? "bg-white text-black" : "bg-[#00FF00] text-white"
      }`}
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
