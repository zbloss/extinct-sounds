import { createClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import WagmiChains from './WagmiChains'

const WagmiClient = () => {
    const [chains, provider, webSocketProvider] = WagmiChains();

    const client = createClient({
        autoConnect: true,
        connectors: [
            // @ts-ignore
            new InjectedConnector({ chains }),
            new WalletConnectConnector({
                // @ts-ignore
                chains,
                options: {
                    qrcode: false,
                },
            }),
        ],
        // @ts-ignore
        provider,
        // @ts-ignore
        webSocketProvider,
    })
    
    return client
      
}
export default WagmiClient;