import InfuraProvider from "./InfuraProvider"
import ExtinctSoundsContract from "./ExtinctSoundsContract"

const GetTokenMetadata = async (tokenId: number) => {

    const provider = InfuraProvider();
    const contract = ExtinctSoundsContract(provider);

    const getTokenDetails = async (tokenId: number) => {
        return await contract.tokenURI(tokenId)
    }

    const tokenIpfsUri = await getTokenDetails(tokenId);

    const addIPFSProxy = (ipfsHash: string) => {
        const URL = "https://extinct-sounds.infura-ipfs.io/ipfs/"
        const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
        const ipfsURL = URL + hash
        return ipfsURL
    }
    
    const tokenIpfsUriProxied = addIPFSProxy(tokenIpfsUri)
    const response = await fetch(tokenIpfsUriProxied)
    const ipfsContent = await response.json()

    const animation = addIPFSProxy(ipfsContent.animation_url)  
    
    return {
        "content": ipfsContent,
        "animation_url": animation
    }
}
export default GetTokenMetadata;