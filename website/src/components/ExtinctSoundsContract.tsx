import ExtinctSoundsABI from '../build/contracts/ExtinctSounds.json';
import ContractMapping from '../build/deployments/map.json';
import { ethers } from 'ethers';

const ExtinctSoundsContract = (provider: ethers.providers.JsonRpcProvider) => {
    const tokenContract = ContractMapping["5"]["ExtinctSounds"][0]
    const contract = new ethers.Contract(tokenContract, ExtinctSoundsABI.abi, provider)
    return contract
}
export default ExtinctSoundsContract;