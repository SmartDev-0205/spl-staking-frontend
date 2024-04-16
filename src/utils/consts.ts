import * as anchor from '@project-serum/anchor';


const endpoint =
    process.env.REACT_APP_SOLANA_RPC_HOST || "https://api.devnet.solana.com";
export const connection = new anchor.web3.Connection(endpoint, 'confirmed');
