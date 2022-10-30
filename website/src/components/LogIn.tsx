import { ethers } from "ethers";
import ChainId from "../constants/ChainId";
import SwitchNetwork from "./SwitchNetwork";

const LogIn = async () => {
    
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner()
    const network = await provider.getNetwork()
    console.log("network:", network);

    if (network['chainId'] !== ChainId()) {
        await SwitchNetwork(ChainId())
    }
    
    const addresses = await provider.send("eth_requestAccounts", []);
    console.log("addresses:", addresses)

    try {
        console.log("trying to get ensName")
        const ensName = await provider.lookupAddress(addresses[0]);
        console.log("ensName:", ensName)
        return [provider, addresses[0], ensName]
    } catch (error: any) {
        console.log("could not get ensname:", error)
        return [provider, addresses[0], undefined]
    }
}


export default LogIn;