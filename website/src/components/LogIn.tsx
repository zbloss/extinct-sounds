import { ethers } from "ethers";
import ChainId from "../constants/ChainId";
import SwitchNetwork from "./SwitchNetwork";

const LogIn = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const network = await provider.getNetwork()
    
    if (network['chainId'] !== ChainId()) {
        await SwitchNetwork(ChainId())
    }
    
    const addresses = await provider.send("eth_requestAccounts", []);
    try {
        const ensName = await provider.lookupAddress(addresses[0]);
        return [provider, addresses[0], ensName]
    } catch (error: any) {
        return [provider, addresses[0], undefined]
    }
}


export default LogIn;