import { useState, useEffect, useMemo } from "react";
import FilledButton from "../components/buttons/FilledButton";
import logoImg from "../assets/images/avata.png";

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
