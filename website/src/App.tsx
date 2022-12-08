import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Route, Routes } from "react-router-dom";

import { 
  useAccount,
  useEnsName,
  useEnsAvatar,
  useBalance,
} from "wagmi";

import Home from './pages/Home';
import Collection from './pages/Collection';
import Error from './pages/Error';
import Appbar from './components/Appbar';


function App() {

  const [formattedBalance, setFormattedBalance] = useState<string | undefined>();
  
  const { address } = useAccount()

  const { data: ensName } = useEnsName({
      address: address
  })

  const { data: ensAvatar } = useEnsAvatar({
      address: address
  })

  const { data: ethBalance, isError: ethBalanceError } = useBalance({
      address: address
  })

  if (ethBalance !== undefined && !ethBalanceError && formattedBalance === undefined) { 
    if (ethBalance.hasOwnProperty("formatted")) {
        setFormattedBalance(`${parseFloat(ethBalance.formatted).toFixed(5)} ${ethers.constants.EtherSymbol}`)
    }
  }

  return (
    
    <div className="App">

        {/* @ts-ignore */}
        <Appbar avatar={ensAvatar} balance={formattedBalance} address={address} ensName={ensName} />

        <Routes>
          {/* @ts-ignore */}
          <Route path="/collection" element={<Collection />}></Route>
          {/* @ts-ignore */}
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>   
      
    </div>
  );
}

export default App;
