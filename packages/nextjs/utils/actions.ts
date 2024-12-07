import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { db } from "~~/firebase";

export const getUserDataUsingWalletAddress = async (walletAddress: string) => {
  const docRef = doc(db, "users", walletAddress);

  const result = await getDoc(docRef);

  if (result.exists()) {
    return {
      id: result.id,
      ...result.data(),
    };
  } else {
    return null;
  }
};

export const formatWalletAddress = (address: string) => {
  console.log(address);
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
