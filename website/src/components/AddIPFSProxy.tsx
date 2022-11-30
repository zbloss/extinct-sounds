const AddIPFSProxy = (ipfsHash: string) => {
    const URL = "https://extinct-sounds.infura-ipfs.io/ipfs/"
    const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
    const ipfsURL = URL + hash
    return ipfsURL
}
export default AddIPFSProxy;