import AddIPFSProxy from "./AddIPFSProxy";

const GetTokenMetadata = async (tokenURI: string) => {
    
    const response = await fetch(tokenURI)

    const ipfsContent = await response.json()
    if (ipfsContent !== undefined) {
        ipfsContent.animation_url = AddIPFSProxy(ipfsContent.animation_url)
        ipfsContent.audio = AddIPFSProxy(ipfsContent.audio)
        ipfsContent.external_url = AddIPFSProxy(ipfsContent.external_url)
        ipfsContent.image = AddIPFSProxy(ipfsContent.image)
        ipfsContent.tokenIpfsUri = tokenURI
    }
    return ipfsContent
}
export default GetTokenMetadata;