import { useState, useEffect, useMemo } from "react";
import FilledButton from "../components/buttons/FilledButton";
import { IDL, TStaking } from "../idl/staking_idl";
import { toast } from "react-toastify";
import * as anchor from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  CONFIG_SEED,
  STAKE_SEED,
  VAULT_SEED,
  connection,
} from "../utils/consts";
import logoImg from "../assets/images/logo.png";
const CONTRACT_ID = "4yuh8EyX5NLL7Vv9PQvWfYKoMUqr5GsB4fjaeU4GRdpA";
const TOKEN_MINT = "FpmLun68EFT2cD554zPKL8uFYph9gGULvGYZp4p2Mvzs";
const CONTRACT_KEY = new anchor.web3.PublicKey(CONTRACT_ID);
const TOKEN_MINT_KEY = new anchor.web3.PublicKey(TOKEN_MINT);

const systemProgram = anchor.web3.SystemProgram.programId;
const tokenProgram = TOKEN_PROGRAM_ID;
const associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID;
const rent = anchor.web3.SYSVAR_RENT_PUBKEY;
const clock = anchor.web3.SYSVAR_CLOCK_PUBKEY;

export default function Blank() {
  const initStakingOptions = [
    {
      id: 1,
      stakeAmount: 0,
      apy: 2,
      parcitipants: 0,
      period: 7,
      stakeFlag: false,
      isStaked: false,
      stakeId: 0,
      stakedAt: 0,
      depositTempValue: 0,
    },
    {
      id: 1,
      apy: 15,
      stakeAmount: 0,
      parcitipants: 0,
      period: 30,
      stakeFlag: false,
      isStaked: false,
      stakeId: 0,
      stakedAt: 0,
      depositTempValue: 0,
    },
    {
      id: 1,
      apy: 40,
      stakeAmount: 0,
      parcitipants: 0,
      period: 60,
      stakeFlag: false,
      isStaked: false,
      stakeId: 0,
      stakedAt: 0,
      depositTempValue: 0,
    },
  ];
  const [stakingOptions, setStakingOptions] = useState(initStakingOptions);
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

  const getDepositStatus = (index: number) => {
    if (!wallet) return false;
    if (stakingOptions[index].stakeFlag) return false;
    return true;
  };

  const getWithdrawStatus = (index: number) => {
    if (!wallet) return false;
    if (stakingOptions[index].stakeFlag) return true;
    return false;
  };

  const getProgram = () => {
    if (!wallet) return;
    const provider = getProvider();
    const program = new anchor.Program(IDL as TStaking, CONTRACT_ID, provider);
    return program;
  };

  const handleStake = async (id: number) => {
    if (!wallet) {
      toast.warning("Please connecct wallet");
      return;
    }
    if (stakingOptions[id].stakeAmount > 0) {
      toast.warning("You staked already.");
      return;
    }
    try {
      const program = getProgram();
      const configPDA = await pda([CONFIG_SEED], CONTRACT_KEY);
      const token_valutPDA = await pda(
        [VAULT_SEED, configPDA.toBuffer(), TOKEN_MINT_KEY.toBuffer()],
        CONTRACT_KEY
      );
      const timestamp = Date.now(); // Get the current UTC timestamp in milliseconds
      const stakeId = new anchor.BN(timestamp);
      const stake = pda(
        [
          STAKE_SEED,
          wallet.publicKey.toBuffer(),
          stakeId.toArrayLike(Buffer, "le", 8),
        ],
        CONTRACT_KEY
      );
      const userTokenVault = getAssociatedTokenAddressSync(
        TOKEN_MINT_KEY,
        wallet.publicKey
      );

      const txid = await program?.methods
        .stake({
          stakeId,
          planIndex: id,
          amount: new anchor.BN(stakingOptions[id].depositTempValue * 1e9),
        })
        .accounts({
          authority: wallet.publicKey,
          configuration: configPDA,
          stake,
          tokenMint: TOKEN_MINT_KEY,
          tokenVault: token_valutPDA,
          userTokenVault,
          tokenProgram,
          systemProgram,
          rent,
          clock,
        })
        .rpc({ skipPreflight: true });
      console.log(txid);
      // rerender(!render);
      toast.success("Staking success");
      await getConfig();
      await getStake();
    } catch (error) {
      toast.error("Staking failed");
    }
  };

  const handleUnStake = async (id: number) => {
    if (!wallet) {
      toast.warning("Please connecct wallet");
      return;
    }
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
    if (stakingOptions[id].stakedAt == 0) {
      toast.warning("You did not stake yet.");
      return;
    }
    if (
      stakingOptions[id].stakedAt + stakingOptions[id].period * 3600 * 24 >
        currentTimestamp &&
      stakingOptions[id].stakedAt > 0
    ) {
      toast.warning("Please wait period");
      return;
    }
    try {
      const program = getProgram();
      const configPDA = await pda([CONFIG_SEED], CONTRACT_KEY);
      const token_valutPDA = await pda(
        [VAULT_SEED, configPDA.toBuffer(), TOKEN_MINT_KEY.toBuffer()],
        CONTRACT_KEY
      );
      const stakeId = new anchor.BN(stakingOptions[id].stakeId);
      const stake = pda(
        [
          STAKE_SEED,
          wallet.publicKey.toBuffer(),
          stakeId.toArrayLike(Buffer, "le", 8),
        ],
        CONTRACT_KEY
      );
      const userTokenVault = getAssociatedTokenAddressSync(
        TOKEN_MINT_KEY,
        wallet.publicKey
      );

      const txid = await program?.methods
        .unstake({ stakeId, planIndex: id })
        .accounts({
          authority: wallet.publicKey,
          configuration: configPDA,
          stake,
          tokenMint: TOKEN_MINT_KEY,
          tokenVault: token_valutPDA,
          userTokenVault,
          tokenProgram,
          systemProgram,
          rent,
          clock,
        })
        .rpc({ skipPreflight: true });
      console.log(txid);
      // rerender(!render);
      toast.success("UnStaking success");
      await getConfig();
      await getStake();
    } catch (error) {
      toast.error("UnStaking failed");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const updatedOptions = [...stakingOptions];
    updatedOptions[index].depositTempValue = parseFloat(value);
    setStakingOptions(updatedOptions);
  };
  const getStake = async () => {
    if (!wallet) return;
    const program = getProgram();
    let result: any = await program?.account.stake.all([
      {
        memcmp: {
          offset: 8 + 1, // Discriminator.
          bytes: wallet.publicKey.toBase58(),
        },
      },
    ]);
    console.log("result ==================>", result);
    if (result.length > 0) {
      let tempOption = [...stakingOptions];
      result.forEach((stake: any) => {
        const amount = stake["account"]["amount"];
        const planIndex = stake["account"]["planIndex"];
        const stakeId = stake["account"]["stakeId"];
        const stakedAt = stake["account"]["stakedAt"];
        if (planIndex) tempOption[planIndex].stakeFlag = true;
        tempOption[planIndex].stakeId = parseInt(stake["account"]["stakeId"]);
        tempOption[planIndex].stakeAmount = parseInt(amount);
        tempOption[planIndex].stakeId = parseInt(stakeId);
        tempOption[planIndex].stakedAt = parseInt(stakedAt);
      });
      setStakingOptions(tempOption);
      return result;
    }
  };

  const getConfig = async () => {
    const program = getProgram();
    const result: any = await program?.account.configuration.all();
    if (result) {
      const account = result[0].account;
      if (account) {
        const plans: [] = account.plans;
        let tempOption = [...stakingOptions];
        for (let index = 0; index < stakingOptions.length; index++) {
          tempOption[index].parcitipants = plans[index]["parcitipants"];
        }
        setStakingOptions(tempOption);
      }
    }
  };

  const updateStakeFlag = async (stakeIndex: number, flag: boolean) => {
    let tempOption = [...stakingOptions];
    tempOption[stakeIndex].stakeFlag = flag;
    setStakingOptions(tempOption);
  };

  useEffect(() => {
    getStake();
    getConfig();
    console.log(
      "Wallet address================>",
      wallet?.publicKey.toBase58()
    );
  }, [wallet]);

  return (
    <section className="h-full flex flex-col pt-[50px] gap-5 sm:pt-0 sm:gap-5 w-full px-10 max-w-[1300px]">
      <p className="text-[15px] sm:text-[20px] px-6 flex justify-center items-center text-center">
        Investors earn fixed % from profit on their deposited tokens.
      </p>
      <p className="text-[15px] sm:text-[20px] px-6 flex justify-center items-center text-center">
        Disclaimer: you cannot withdraw tokens until lock time ends, so if the
        price moves down there is possibility to lose.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 h-fit pt-6 pb-4 gap-10">
        {stakingOptions.map((stake, index) => (
          <div className="flex flex-col gap-5" key={`${index}staking`}>
            <div className="w-[350px] flex items-center justify-center">
              <div className="flex flex-row gap-[5px] p-[5px]  bg-[#259625] rounded-full">
                <div
                  onClick={() => {
                    updateStakeFlag(index, false);
                  }}
                  className={`w-[100px] md:w-[120px] lg:w-[150px] py-[5px] ${
                    !stake.stakeFlag && "bg-[green]"
                  } rounded-full text-center cursor-pointer switch-item`}
                >
                  <span className="text-[15px] md:text-[18px] lg:text-[20px] font-semibold">
                    Stake
                  </span>
                </div>

                <div
                  onClick={() => {
                    updateStakeFlag(index, true);
                  }}
                  className={`w-[100px] md:w-[120px] lg:w-[150px] py-[5px]  ${
                    stake.stakeFlag && "bg-[green]"
                  } rounded-full text-center cursor-pointer switch-item`}
                >
                  <span className="text-[15px] md:text-[18px] lg:text-[20px] font-semibold">
                    Unstake
                  </span>
                </div>
              </div>
            </div>

            <div
              className="py-6 px-6 bg-[#081117] flex flex-col gap-[10px] w-[350px] rounded-lg border text-[#f8f8f9] shadow-sm border-[#eee]"
              key={index}
            >
              <div className=" flex items-center justify-between">
                <img
                  src={logoImg}
                  alt={`${stake.id} logo`}
                  className=" w-[90px] "
                  loading="lazy"
                />

                <div className="flex gap-4 flex-col">
                  <span className="opacity-100 font-bold text-[25px]">
                    Frogo
                  </span>
                  <span className="opacity-60">Will Be Locked</span>
                  <div className="text-base  px-4 py-2 font-semibold bg-[#182b48] rounded-md normal-case flex justify-end">
                    {stake.period} days
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between  opacity-60 text-[18px]">
                <span>Current APY:</span>
                <span>{stake.apy} %</span>
              </div>

              <div className="flex flex-row justify-between  opacity-60 text-[18px]">
                <span>Earn:</span>
                <span>Frogo</span>
              </div>

              <div className="flex flex-row justify-between opacity-60 text-[18px]">
                <span>Entity:</span>
                <span className="font-[700] ">{stake.parcitipants}</span>
              </div>

              <div className="flex flex-row justify-between  opacity-60 text-[18px]">
                <span>Frogo Staked</span>
                <span className="text-[#ff4500]  font-[800]">In Progress</span>
              </div>

              {!stake.stakeFlag && (
                <div className="flex flex-row justify-between  opacity-60 text-[18px]">
                  <input
                    type="number"
                    className="bg-[#182b48] text-[#f8f8f9] rounded-md px-2 py-2 w-full"
                    placeholder="Enter stake amount"
                    min="0"
                    step="0.01"
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={stake.stakeAmount ? true : false}
                  />
                </div>
              )}

              <div className="flex justify-center gap-4">
                {!stake.stakeFlag ? (
                  <FilledButton
                    onClick={() => {
                      handleStake(index);
                    }}
                    disabled={!getDepositStatus(index)}
                    className="w-full text-base  font-semibold button-color mt-[5px]"
                  >
                    Deposit
                  </FilledButton>
                ) : (
                  <FilledButton
                    onClick={() => {
                      handleUnStake(index);
                    }}
                    className="w-full text-base  font-semibold button-color mt-[5px]"
                    disabled={!getWithdrawStatus(index)}
                  >
                    Withdraw
                  </FilledButton>
                )}
              </div>

              <div className="flex flex-row justify-between opacity-60 text-[18px]">
                <span>You Staked:</span>
                <span>{stake.stakeAmount / 1e9} Frogo</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
