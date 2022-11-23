import { ethers } from 'ethers';

const GetEnsName = async (provider: ethers.providers.JsonRpcProvider, address: string) => {
    const ensName = await provider.lookupAddress(address);
    console.log("GetEnsName, ensName:",  ensName)
    return ensName
}

export default GetEnsName;