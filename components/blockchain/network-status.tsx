"use client"

import Link from "next/link"
import { useAccount, useBlockNumber } from "wagmi"

import { cn } from "@/lib/utils"
import { GetNetworkColor } from "@/lib/utils/get-network-color"
import { Badge } from "@/components/ui/badge"

const badgeVariants: Record<ReturnType<typeof GetNetworkColor>, string> = {
  green: "bg-green-200 text-green-700",
  blue: "bg-blue-200 text-blue-700",
  red: "bg-red-200 text-red-700",
  purple: "bg-purple-200 text-purple-700",
  gray: "bg-gray-200 text-gray-700",
  yellow: "bg-yellow-200 text-yellow-700",
}

export function NetworkStatus() {
  const { data } = useBlockNumber()
  const { chain } = useAccount()
  const blockExplorerUrl = chain?.blockExplorers?.default.url

  if (!chain || !blockExplorerUrl) return null

  return (
    <Link
      href={blockExplorerUrl}
      target="_blank"
      className="fixed bottom-4 left-4 z-10 flex items-center overflow-hidden rounded-full bg-muted text-muted-foreground shadow-md"
    >
      <Badge
        className={cn(
          "rounded-full py-2 text-xs font-bold uppercase leading-none tracking-wider hover:text-white dark:hover:text-black",
          badgeVariants[GetNetworkColor(chain.name)]
        )}
      >
        {chain.name}
      </Badge>
      {/* <p className="mx-2 text-xs">#{data?.toString()}</p> */}
    </Link>
  )
}
