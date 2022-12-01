import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { WagmiConfig } from 'wagmi'
import WagmiClient from './components/WagmiClient';
import { Web3Modal } from '@web3modal/react'
import EthClient from './components/EthClient';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

const wClient = WagmiClient()
const ethClient = EthClient()


root.render(
  <BrowserRouter>
    {/* @ts-ignore */}
    <WagmiConfig client={wClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />        
        <App />
      </ThemeProvider>
    </WagmiConfig>
    <Web3Modal
      projectId={process.env["REACT_APP_WALLET_CONNECT_PROJECT_ID"]}
      ethereumClient={ethClient}
    />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
