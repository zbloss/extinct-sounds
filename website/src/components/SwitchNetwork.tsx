import { utils } from 'ethers';

const SwitchNetwork = async (chainId: number) => {

    const chain = utils.hexValue(chainId)

    const switchChain = async (hex: string) => {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hex }], // chainId must be in hexadecimal numbers
      });
    }

    try {
        // check if the chain to connect to is installed
        await switchChain(chain)

    } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: chain,
                  // rpcUrl: chain["RPC"],
                },
              ],
            });
            await switchChain(chain);

          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
    }    
}

export default SwitchNetwork;