import { ethers } from "ethers";
import ChainId from "../constants/ChainId";
import SwitchNetwork from "./SwitchNetwork";

const LogIn = async () => {
    
    const url = `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
    console.log("url:", url);

    //const provider = new ethers.providers.JsonRpcProvider(url)

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.providers.InfuraProvider(
    //     "goerli", 
    //     "2b16ea43114d46f1aea7b677a52abd4f"
    // )
    console.log("provider:", provider, provider.connection)

    const signer = await provider.getSigner()
    console.log("signer:", signer, signer._address)

    const network = await provider.getNetwork()
    console.log("network:", network);

    if (network['chainId'] !== ChainId()) {
        console.log("changing network")
        console.log("network[chainId]:", network['chainId'])
        console.log("ChainId():", ChainId())

        await SwitchNetwork(ChainId())
    }
    
    // const addresses = await provider.listAccounts()

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