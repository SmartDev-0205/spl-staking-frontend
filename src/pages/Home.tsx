import { useState, useEffect, useMemo } from "react";
import FilledButton from "../components/buttons/FilledButton";
import logoImg from "../assets/images/avata.png";
import { IDL, TStaking } from "../idl/staking_idl";

import * as anchor from "@project-serum/anchor";
import {
  Commitment,
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
  SystemProgram,
  ConfirmOptions,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  CONFIG_SEED,
  STAKE_SEED,
  VAULT_SEED,
  connection,
} from "../utils/consts";

const CONTRACT_ID = "7GYhhyfMSy7oDg9Ym7u2UsvoKGdZq3UqVXt77LvSGsxL";
const TOKEN_MINT = "Aq36ngTDYx6YyM8UnuTnDSTkNXjqZ4mo6eXTgVzpCpP2";
const CONTRACT_KEY = new anchor.web3.PublicKey(CONTRACT_ID);
const TOKEN_MINT_KEY = new anchor.web3.PublicKey(TOKEN_MINT);

export default function Blank() {
  const stakingOptions = [
    {
      id: 1,
      name: "ETF Enthusiast",
      stakeAmount: "500,000",
      rewardAmount: "539,583",
      totalStaked: 0,
      lock: 1,
      limit: 80,
    },
    {
      id: 2,
      name: "ETF Enthusiast",
      stakeAmount: "1,108,333",
      rewardAmount: "539,583",
      totalStaked: 0,
      lock: 2,
      limit: 70,
    },
    {
      id: 3,
      name: "Bull Market Bae",
      stakeAmount: "2,000,000",
      rewardAmount: "2,250,000",
      totalStaked: 0,
      lock: 2,
      limit: 60,
    },
    {
      id: 4,
      name: "Bull Market Bae",
      stakeAmount: "3,000,000",
      rewardAmount: "3,525,000",
      totalStaked: 0,
      lock: 6,
      limit: 50,
    },
    {
      id: 5,
      name: "Index Fund Influencer",
      stakeAmount: "4,000,000",
      rewardAmount: "4,750,000",
      totalStaked: 0,
      lock: 9,
      limit: 40,
    },
    {
      id: 6,
      name: "Wall Street Wizard",
      stakeAmount: "5,000,000",
      rewardAmount: "6,000,000",
      totalStaked: 0,
      lock: 12,
      limit: 30,
    },
  ];

  const wallet = useAnchorWallet();
  console.log("wallet address -----------", wallet);

  const getProvider = () => {
    if (wallet)
      return new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions()
      );
  };

  const pda = (
    seeds: (Buffer | Uint8Array)[],
    programId: anchor.web3.PublicKey
  ): anchor.web3.PublicKey => {
    const [pdaKey] = anchor.web3.PublicKey.findProgramAddressSync(
      seeds,
      programId
    );
    return pdaKey;
  };

  const getProgram = () => {
    if (!wallet) return;
    const provider = getProvider();
    const program = new anchor.Program(IDL as TStaking, CONTRACT_ID, provider);
  };

  const handleStake = async (id: number) => {
    if (!wallet) return;
    const program = getProgram();
    const configPDA = await pda([CONFIG_SEED], CONTRACT_KEY);
    const token_valutPDA = await pda(
      [VAULT_SEED, configPDA.toBuffer(), TOKEN_MINT_KEY.toBuffer()],
      CONTRACT_KEY
    );
    const stakeId = new anchor.BN(19960205);
    const stake = pda(
      [
        STAKE_SEED,
        wallet.publicKey.toBuffer(),
        stakeId.toArrayLike(Buffer, "le", 8),
      ],
      CONTRACT_KEY
    );
    // const userTokenVault = getAssociatedTokenAddressSync(pepeTokenMint, provider.wallet.publicKey);
  };

  return (
    <section className="h-full flex flex-col pt-[50px] gap-5 sm:pt-0 sm:gap-5 w-full px-10 max-w-[1300px]">
      <div className="w-full">
        <p className="text-4xl my-1">Staking</p>
        <p className="text-lg my-1">Earn fees by providing liquidity</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 h-fit pt-6 pb-4 gap-10">
        {stakingOptions.map((stake, index) => (
          <div
            className="card-gradient text-[#405f9d] relative h-fit p-10 flex flex-col gap-[10px] w-[350px] sm:w-[550px] max-w-full rounded-lg border  shadow-sm border-[#251635]"
            key={index}
          >
            <div className="flex justify-center font-bold text-3xl mb-10">
              {stake.name}
            </div>
            <div className="flex justify-between">
              <span>Stake:</span>
              <span>{stake.stakeAmount} $PEPE</span>
            </div>

            <div className="flex justify-between">
              <span>You will get:</span>
              <span>{stake.rewardAmount} $PEPE</span>
            </div>

            <div className="flex justify-between">
              <span>Lock day:</span>
              <span>{stake.lock} Month</span>
            </div>

            <div className="flex justify-between">
              <span>Entity:</span>
              <span>0/{stake.limit}</span>
            </div>

            <div className="flex justify-center gap-4">
              <FilledButton
                onClick={() => {}}
                className="w-full text-base  font-semibold button-color mt-[5px]"
              >
                Deposit
              </FilledButton>
              <FilledButton
                onClick={() => {}}
                className="w-full text-base  font-semibold button-color mt-[5px]"
              >
                Withdraw
              </FilledButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
