export const ABI = [
  {
    inputs: [],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "StreamerAlreadyRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "StreamerNotRegistered",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "streamer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DonationReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "streamer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PayoutProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "StreamerRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getPendingPayoutBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "pendingAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getStreamerBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "isStreamerRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registerStreamer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestPayout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "streamers",
    outputs: [
      {
        internalType: "address payable",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isRegistered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const contractAddress = "0xe8d37cf0e7b6e52480095247be22a37c97d96754";
