export const CONTRACT_ADDRESS =
  "0xB0056F4059cB2E463099868f069B7286cA93825d";

export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "degreeHash",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "studentId",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "studentName",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "degreeTitle",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "ipfsCid",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "issuedAt",
        type: "uint256"
      }
    ],
    name: "DegreeIssued",
    type: "event"
  },

  {
    inputs: [
      {
        internalType: "string",
        name: "studentId",
        type: "string"
      },
      {
        internalType: "string",
        name: "studentName",
        type: "string"
      },
      {
        internalType: "string",
        name: "degreeTitle",
        type: "string"
      },
      {
        internalType: "string",
        name: "degreeHash",
        type: "string"
      },
      {
        internalType: "string",
        name: "ipfsCid",
        type: "string"
      }
    ],
    name: "issueDegree",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },

  {
    inputs: [
      {
        internalType: "string",
        name: "degreeHash",
        type: "string"
      }
    ],
    name: "verifyDegree",
    outputs: [
      {
        internalType: "bool",
        name: "exists",
        type: "bool"
      },
      {
        internalType: "string",
        name: "studentId",
        type: "string"
      },
      {
        internalType: "string",
        name: "studentName",
        type: "string"
      },
      {
        internalType: "string",
        name: "degreeTitle",
        type: "string"
      },
      {
        internalType: "string",
        name: "ipfsCid",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "issuedAt",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];