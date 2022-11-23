import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Route, Routes } from "react-router-dom";
import { useAccount, Web3Modal, useEnsName, useEnsAvatar, useBalance } from '@web3modal/react'

import Home from './pages/Home';
import Error from './pages/Error';
import Appbar from './components/Appbar';
import ShortenString from './components/ShortenString';

function App() {

  const [formattedBalance, setFormattedBalance] = useState<string | undefined>();

  const { account } = useAccount()

  const config = {
      projectId: process.env["REACT_APP_WALLET_CONNECT_PROJECT_ID"],
      theme: 'dark',
      accentColor: 'default',
      ethereum: {
        appName: 'extinct-sounds'
      }
  }

  const { data: ensName } = useEnsName({
      // @ts-ignore
      address: account.address
  })

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: account.address
  })

  const { data: ethBalance, error: ethBalanceError } = useBalance({
    addressOrName: account.address
  })

  if (ethBalance !== undefined && !ethBalanceError && formattedBalance === undefined) { 
    if (ethBalance.hasOwnProperty("formatted")) {
        setFormattedBalance(`${parseFloat(ethBalance.formatted).toFixed(5)} ${ethers.constants.EtherSymbol}`)
    }
  }

  return (
    
    <div className="App">
      {/* @ts-ignore */}
      <Web3Modal config={config} />

        {/* @ts-ignore */}
      <Appbar avatar={ensAvatar} balance={formattedBalance} address={ensName ? ensName : ShortenString(account.address)} />

      <Routes>
        {/* @ts-ignore */}
        <Route path="/" element={<Home address={ensName ? ensName : ShortenString(account.address)}/>}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>    
    </div>
  );
}

export default App;
