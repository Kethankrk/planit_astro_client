import { CustomError } from "@/lib/api";
import { ethers } from "ethers";
import NFTJSON from "./EventTicketNFT.json";

interface NFTContract {
  mintTicket: (tokenUri: string) => Promise<void>;
}

const connectToMetaMask = async (): Promise<ethers.BrowserProvider> => {
  if (!(window as any).ethereum) {
    throw new CustomError("MetaMask not installed");
  }
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  await (window as any).ethereum.request({ method: "eth_requestAccounts" });
  return provider;
};

export const mintNFT = async (id: number): Promise<void> => {
  const provider = await connectToMetaMask();
  const signer = await provider.getSigner();
  const contractAddress = "0x9E95c3E0eEea9DA3b6fB70FD3d3239078f0e9d50";
  const NFTContract = new ethers.Contract(
    contractAddress,
    NFTJSON.abi,
    signer
  ) as ethers.Contract & NFTContract;
  const tokenURI = `http://localhost:4321/api/ticket/svg/${id}`;
  const tx = await NFTContract.mintTicket(tokenURI);

  alert("Transaction sent");
};
