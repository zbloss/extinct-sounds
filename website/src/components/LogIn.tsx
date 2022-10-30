import { ethers } from "ethers";

const LogIn = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)  
    const addresses = await provider.send("eth_requestAccounts", []);
    const ensName = await provider.lookupAddress(addresses[0]);
    return [provider, addresses[0], ensName]
}


export default LogIn;