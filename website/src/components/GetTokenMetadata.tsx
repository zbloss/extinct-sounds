import InfuraProvider from "./InfuraProvider"
import ExtinctSoundsContract from "./ExtinctSoundsContract"

const GetTokenMetadata = async (tokenId: number) => {

    const provider = InfuraProvider();
    const contract = ExtinctSoundsContract(provider);
    const tokenIpfsUri = await contract.tokenURI(tokenId)

    const addIPFSProxy = (ipfsHash: string) => {
        const URL = "https://extinct-sounds.infura-ipfs.io/ipfs/"
        const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
        const ipfsURL = URL + hash
        return ipfsURL
    }

    const tokenIpfsUriProxied = addIPFSProxy(tokenIpfsUri)
    const response = await fetch(tokenIpfsUriProxied)
    const ipfsContent = await response.json()
    ipfsContent.animation_url = addIPFSProxy(ipfsContent.animation_url)
    ipfsContent.audio = addIPFSProxy(ipfsContent.audio)
    ipfsContent.external_url = addIPFSProxy(ipfsContent.external_url)
    ipfsContent.image = addIPFSProxy(ipfsContent.image)
    return ipfsContent
}
export default GetTokenMetadata;