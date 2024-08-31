"use client"

import { data } from "tailwindcss/defaultTheme"
import { useAccount } from "wagmi"

import { useUser } from "@/lib/hooks/use-user"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export default function PageDashboardTransactions() {
  return (
    <section className="px-10 py-6 lg:py-8">
      <div className="flex items-center justify-between">
        <h3 className="text-4xl font-normal">Transactions</h3>
        <IsWalletConnected>
          <IsSignedOut>
            <div className="flex items-center gap-x-5 text-center">
              <span className="text-sm text-foreground">
                Login to access the TurboETH free API
              </span>
              <ButtonSIWELogin />
            </div>
          </IsSignedOut>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <span>Connect wallet and login to access page</span>
        </IsWalletDisconnected>
      </div>
      <hr className="my-5 opacity-50" />
      <IsSignedIn>
        <Table />
      </IsSignedIn>
    </section>
  )
}

const Table = () => {
  const { user } = useUser()
  const { chain } = useAccount()

  return <div className="w-full"></div>
}
