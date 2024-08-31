"use client"

import { WithdrawForm } from "components/blockchain/withdraw"
import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { Card } from "@/components/ui/card"
import { DepositForm } from "@/components/blockchain/depositForm"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

export default function PageDashboardAccount() {
  return (
    <motion.div
      animate="show"
      className="flex  w-full flex-col items-start justify-start py-6 md:p-6 "
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
        <h1 className="mb-6 text-3xl font-bold">提现/记录</h1>
        {/* <p className="mb-6 text-sm text-gray-500">Welcome Back!</p> */}
        {/* <div className="mb-6 flex w-full flex-row justify-between space-x-4">
          <AccountCard title="Savings Account" amount={0} />
          <AccountCard title="Investments Account" amount={0} />
          <AccountCard title="Miscellaneous Account" amount={0} />
          <AccountCard title="August Savings" amount={0} editable={true} />
        </div>
        <div className="flex w-full flex-row justify-between space-x-4">
          <Card className="w-full p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">August Transactions</h3>
              <button className="text-green-500">View in Detail</button>
            </div>
            <p className="text-center text-gray-500">
              No entries added Yet!
              <br />
              Add your first entry of the month.
            </p>
          </Card> */}
        {/* <Card className="w-1/2 p-6">
            <h3 className="mb-2 text-xl font-semibold">August Overview</h3>
            <p className="text-gray-500">
              Start adding entries to get more insights.
            </p>
          </Card> */}
        {/* </div> */}
        <div className=" w-full font-bold ">
          <WithdrawForm />
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">
          Connect Wallet to view your personalized dashboard.
        </h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}

interface AccountCardProps {
  title: string
  amount: number
  editable?: boolean
}

function AccountCard({ title, amount, editable }: AccountCardProps) {
  return (
    <Card className="flex-1 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{title}</h4>
        {editable && <button className="text-gray-500">↗</button>}
      </div>
      <p className="mt-2 text-2xl font-bold">${amount}</p>
    </Card>
  )
}
