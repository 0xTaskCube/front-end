"use client"

import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { Card } from "@/components/ui/card"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

export default function PageDashboardAccount() {
  return (
    <motion.div
      animate="show"
      className="flex h-full w-full flex-col items-start justify-start py-6 md:p-6"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
        <h1 className="mb-2  flex max-w-xl flex-col items-baseline text-center text-3xl font-bold md:flex-row">
          Hello
          {/* <WalletEnsName /> */}
          <WalletAddress className="mt-2 block text-sm font-light md:ml-2 md:mt-0 md:text-xl" />
        </h1>
        <p className="mb-6 text-sm text-gray-500">Welcome Back!</p>
        <div className="mb-6 grid w-full grid-cols-2 gap-4">
          <AccountCard
            title="保证金余额"
            amount={8000}
            editable={true}
            href="/dashboard/deposit"
          />
          <AccountCard title="积分" amount={0} editable={true} />
          <AccountCard
            title="Miscellaneous Account"
            amount={0}
            editable={true}
          />
          <AccountCard title="August Savings" amount={0} editable={true} />
        </div>
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
        </Card>
        <Card className="mt-4 w-full p-6">
          <h3 className="mb-2 text-xl font-semibold">August Overview</h3>
          <p className="text-gray-500">
            Start adding entries to get more insights.
          </p>
        </Card>
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
  href?: string
}

function AccountCard({ title, amount, editable, href }: AccountCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{title}</h4>
        {editable && <button className="text-gray-500">↗</button>}
      </div>
      <p className="mt-2 text-2xl font-bold">${amount}</p>
    </Card>
  )
}
