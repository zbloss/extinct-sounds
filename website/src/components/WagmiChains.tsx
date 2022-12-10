import { configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'

const WagmiChains = () => {
    const { chains, provider, webSocketProvider } = configureChains(
        [chain.goerli, chain.mainnet],
        // chain.mainnet
        [
            infuraProvider({
                // @ts-ignore
                apiKey: process.env["2b16ea43114d46f1aea7b677a52abd4f"],
                priority: 0,
            }),
            publicProvider({
                priority: 1
            })
        ],
    )
    return [chains, provider, webSocketProvider]
}
export default WagmiChains;