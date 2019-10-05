export const KISAAN_ADDRESS = "0x93F19a8aa5ea2B56042f14FDd5dD1099befBdbe9";

export const KISAAN_ABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "ownerLogin",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x95bdfe03"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "officialLogin",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x37ed41ad"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0xd0e30db0"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_farmerAddress",
          "type": "address"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x51cff8d9"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_password",
          "type": "string"
        },
        {
          "name": "_farmerPassword",
          "type": "string"
        },
        {
          "name": "_farmerAddress",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "receivedGoods",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x881f1f21"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_officialPassword",
          "type": "string"
        },
        {
          "name": "_farmerAddress",
          "type": "address"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "addFarmer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xabbfdf28"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_officialPassword",
          "type": "string"
        },
        {
          "name": "_officialAddress",
          "type": "address"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_password",
          "type": "string"
        },
        {
          "name": "_isValidator",
          "type": "bool"
        }
      ],
      "name": "addOfficial",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x93da2400"
    }
  ]