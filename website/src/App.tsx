import React, { useState } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Route, Routes } from "react-router-dom";
import Error from './pages/Error';

import './App.css';

function App() {

  const [ethProvider, setEthProvider] = useState<ethers.providers.Web3Provider | undefined>();
  const [ethAddress, setEthAddress] = useState<string | undefined>();
  const [ensName, setEnsName] = useState<string | undefined | null>();
  const [clickedLogIn, setClickedLogIn] = useState<boolean>(false);

  const loggedInParams = async (logindata: any) => {

    setEthProvider(logindata[0]);
    setEthAddress(logindata[1]);
    setEnsName(logindata[2]);

  }

  const logInClicked = async (clicked: any) => {
    setClickedLogIn(clicked)
  }

  return (
    <div className="App">
      <Navbar loggedInParams={loggedInParams} logInClicked={logInClicked} />

      <Routes>
        <Route path="/" element={
          <Home 
            ethAddress={ethAddress} 
            ensName={ensName} 
            clickedLogIn={clickedLogIn}
          />
        }></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>    
    </div>
  );
}

export default App;
