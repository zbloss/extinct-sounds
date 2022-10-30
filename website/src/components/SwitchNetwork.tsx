import { useSwitchNetwork } from '@web3modal/react';

const SwitchNetwork = async (chainId: number) => {

    // Usage
    const { data, error, isLoading, switchNetwork } = useSwitchNetwork({
      chainId: chainId
    })
    switchNetwork()
    if (error) {
      console.error("Error switching networks:", error)
    }
}

export default SwitchNetwork;