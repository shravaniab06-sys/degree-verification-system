import { ethers } from "ethers";
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI
} from "../contracts/contractConfig";

export function isMetaMaskInstalled() {
  return (
    typeof window !== "undefined" &&
    Boolean(window.ethereum)
  );
}

export async function connectWallet() {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed.");
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  if (!accounts || accounts.length === 0) {
    throw new Error("No wallet account found.");
  }

  return accounts[0];
}

export function getProvider() {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed.");
  }

  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = getProvider();

  return await provider.getSigner();
}

export async function getContract(withSigner = true) {
  if (!CONTRACT_ADDRESS) {
    throw new Error(
      "Contract address is not configured."
    );
  }

  if (
    !CONTRACT_ABI ||
    CONTRACT_ABI.length === 0
  ) {
    throw new Error(
      "Contract ABI is not configured."
    );
  }

  const provider = getProvider();

  if (withSigner) {
    const signer = await provider.getSigner();

    return new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
  }

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );
}

export async function checkContract() {
  const provider = getProvider();

  const code = await provider.getCode(
    CONTRACT_ADDRESS
  );

  return code !== "0x";
}

export async function getNetwork() {
  const provider = getProvider();

  const network = await provider.getNetwork();

  return {
    chainId: network.chainId.toString(),
    name: network.name
  };
}

export async function issueDegree(
  studentId,
  studentName,
  degreeTitle,
  degreeHash,
  ipfsCid
) {
  const contract = await getContract(true);

  if (
    typeof contract.issueDegree !== "function"
  ) {
    throw new Error(
      "issueDegree() is missing from the contract ABI."
    );
  }

  const transaction =
    await contract.issueDegree(
      studentId,
      studentName,
      degreeTitle,
      degreeHash,
      ipfsCid
    );

  console.log(
    "Transaction hash:",
    transaction.hash
  );

  const receipt =
    await transaction.wait();

  return {
    receipt,
    transactionHash:
      transaction.hash
  };
}

export async function verifyDegree(
  degreeHash
) {
  const contract =
    await getContract(false);

  if (
    typeof contract.verifyDegree !== "function"
  ) {
    throw new Error(
      "verifyDegree() is missing from the contract ABI."
    );
  }

  const result =
    await contract.verifyDegree(
      degreeHash
    );

  return {
    exists: result[0],
    studentId: result[1],
    studentName: result[2],
    degreeTitle: result[3],
    ipfsCid: result[4],
    issuedAt: result[5].toString()
  };
}

export async function getIssuedDegrees() {

  const contract =
    await getContract(false);

  const provider =
    getProvider();

  const latestBlock =
    await provider.getBlockNumber();

  const fromBlock =
    Math.max(
      0,
      latestBlock - 9999
    );

  console.log(
    `Searching blocks ${fromBlock} to ${latestBlock}`
  );

  const events =
    await contract.queryFilter(
      contract.filters.DegreeIssued(),
      fromBlock,
      latestBlock
    );

  return events.map((event) => ({
    degreeHash: event.args[0],
    studentId: event.args[1],
    studentName: event.args[2],
    degreeTitle: event.args[3],
    ipfsCid: event.args[4],
    issuedAt:
      event.args[5].toString(),
    transactionHash:
      event.transactionHash
  }));
}