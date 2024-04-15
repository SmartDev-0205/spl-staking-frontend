import React from "react";
import { useMemo } from "react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";

// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";

// import * as anchor from "@project-serum/anchor";
// import { clusterApiUrl } from "@solana/web3.js";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//   getPhantomWallet,
//   getSolflareWebWallet,
// } from "@solana/wallet-adapter-wallets";

// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import Routes from "./Routes";

// const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

// const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
// const connection = new anchor.web3.Connection(
//   rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
// );

function App() {
  // Custom RPC endpoint.
  // const endpoint = useMemo(() => clusterApiUrl(network), []);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  // const wallets = useMemo(
  //   () => [getPhantomWallet(), getSolflareWebWallet()],
  //   []
  // );
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {/* <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider> */}
        <Routes />
        <ToastContainer className="!z-[99999]" />
        {/* </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider> */}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
