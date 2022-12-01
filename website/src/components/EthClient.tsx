import WagmiClient from './WagmiClient'
import WagmiChains from './WagmiChains';
import { EthereumClient } from '@web3modal/ethereum';

const EthClient = () => {

    const wagmiClient = WagmiClient()
    const wagmichains = WagmiChains();
    const chains = wagmichains[0];
    // @ts-ignore
    const ethereumClient = new EthereumClient(wagmiClient, chains);
    return ethereumClient

}
export default EthClient;