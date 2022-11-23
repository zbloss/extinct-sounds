import { ethers } from 'ethers';

const InfuraProvider = () => {
    const network = "goerli";
    const networkId = 5

    const infuraAPIKey = process.env["REACT_APP_INFURA_API_KEY"];
    const infuraProvider = new ethers.providers.JsonRpcProvider(
        `https://${network}.infura.io/v3/${infuraAPIKey}`,
        networkId
    );
    
    return infuraProvider;

}
export default InfuraProvider;