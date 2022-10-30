import { ethers } from "ethers";
import ChainId from "../constants/ChainId";
import SwitchNetwork from "./SwitchNetwork";

const LogIn = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider:", provider)

    const signer = await provider.getSigner()
    console.log("signer:", signer)

    const network = await provider.getNetwork()
    console.log("network:", network);

    if (network['chainId'] !== ChainId()) {
        console.log("changing network")
        console.log("network[chainId]:", network['chainId'])
        console.log("ChainId():", ChainId())

        await SwitchNetwork(ChainId())
    }
    
    const addresses = await provider.send("eth_requestAccounts", []);
    console.log("addresses:", addresses)

    try {
        const ensName = await provider.lookupAddress(addresses[0]);
        console.log("ensName:", ensName)

        return [provider, addresses[0], ensName]
    } catch (error: any) {
        return [provider, addresses[0], undefined]
    }
}


export default LogIn;