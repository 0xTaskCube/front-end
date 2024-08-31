import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { createEthWallet } from "components/blockchain/generateWallet"

import { Card } from "@/components/ui/card"

interface Coin {
  id: number
  name: string
  avatar: string
}

interface Network {
  id: number
  name: string
  avatar: string
}

interface DepositHistory {
  time: string
  address: string
  coin: string
  amount: string
  progress: string
  status: string
}

const coin: Coin[] = [
  {
    id: 1,
    name: "USDT",
    avatar:
      "https://pbs.twimg.com/profile_images/1522267869920247809/uFYLh_nU_400x400.png",
  },
]

const netWork: Network[] = [
  {
    id: 1,
    name: "TRC20",
    avatar:
      "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png",
  },
  {
    id: 2,
    name: "ERC20",
    avatar: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
]

export function DepositForm() {
  const [selected, setSelected] = useState(coin[0]) // 确保有默认值
  const [selectedNetwork, setSelectedNetwork] = useState(netWork[0]) // 确保有默认值
  const [showDepositHistory, setShowDepositHistory] = useState(false)
  const [depositAddress, setDepositAddress] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  useEffect(() => {
    async function generateWalletAndAddress() {
      try {
        const { address } = await createEthWallet() // 生成钱包和地址
        setDepositAddress(address) // 更新到组件状态中
        setQrCodeUrl(address) // 假设二维码内容就是充值地址
      } catch (error) {
        console.error("生成钱包地址时出错:", error)
      }
    }

    void generateWalletAndAddress() // 调用生成钱包和地址的函数
  }, [selected, selectedNetwork])

  // 复制地址到剪贴板
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress)
      alert("地址已复制到剪贴板")
    } catch (error) {
      console.error("复制地址失败:", error)
    }
  }

  // 模拟充值记录数据
  const depositHistory: DepositHistory[] = [
    {
      time: "2024/08/25 14:18:32",
      address: "TCp5zzfJWxs7BXRQkCcabPBfqwZxBeyNM5",
      coin: "TRX",
      amount: "58.1032",
      progress: "19/19",
      status: "Confirmed",
    },
    // ... 其他元素
  ]

  return (
    <Card className="hide-scrollbar mx-auto w-full overflow-y-auto rounded-lg p-6 pb-4 shadow-lg">
      <div className="mb-6 flex justify-between space-x-2">
        <button
          className={`rounded-full px-4 py-2 text-sm ${
            !showDepositHistory
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowDepositHistory(false)}
        >
          充值
        </button>
        <button
          className={`rounded-full px-4 py-2 text-sm ${
            showDepositHistory
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowDepositHistory(true)}
        >
          记录
        </button>
      </div>

      {!showDepositHistory ? (
        <>
          <div className="mb-4">
            <Listbox value={selected} onChange={setSelected}>
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                加密货币
              </Label>
              <div className="relative mt-2">
                {selected && (
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                      <img
                        alt=""
                        src={selected.avatar}
                        className="h-5 w-5 shrink-0 rounded-full"
                      />
                      <span className="ml-3 block truncate">
                        {selected.name}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                    </span>
                  </ListboxButton>
                )}

                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {coin.map((name) => (
                    <ListboxOption
                      key={name.id}
                      value={name}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-800 data-[focus]:text-white"
                    >
                      <div className="flex items-center">
                        <img
                          alt=""
                          src={name.avatar}
                          className="h-5 w-5 shrink-0 rounded-full"
                        />
                        <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                          {name.name}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-800 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div className="mb-4">
            <Listbox value={selectedNetwork} onChange={setSelectedNetwork}>
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                网络
              </Label>
              <div className="relative mt-2">
                {selectedNetwork && (
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                      <img
                        alt=""
                        src={selectedNetwork.avatar}
                        className="h-5 w-5 shrink-0 rounded-full"
                      />
                      <span className="ml-3 block truncate">
                        {selectedNetwork.name}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                    </span>
                  </ListboxButton>
                )}

                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {netWork.map((netName) => (
                    <ListboxOption
                      key={netName.id}
                      value={netName}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-800 data-[focus]:text-white"
                    >
                      <div className="flex items-center">
                        <img
                          alt=""
                          src={netName.avatar}
                          className="h-5 w-5 shrink-0 rounded-full"
                        />
                        <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                          {netName.name}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-800 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div className="mb-4 flex justify-center">
            {qrCodeUrl ? (
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeUrl}&size=200x200`}
                alt="充值二维码"
                width={200}
                height={200}
              />
            ) : (
              <Image
                src="/qr-placeholder.png"
                alt="充值二维码"
                width={200}
                height={200}
              />
            )}
          </div>

          <div className="mb-4 text-center">
            <p className="break-all text-xl text-gray-600">{depositAddress}</p>
          </div>

          <div className="mb-4">
            <p className="text-center text-xs text-gray-500">
              此地址仅适用于 {selected.name} 网络上的 {selectedNetwork.name}
              。不要发送任何其他加密货币, 否则可能会丢失且无法找回。
            </p>
          </div>

          <button
            onClick={handleCopyAddress}
            className="w-full rounded-md bg-gray-800 py-2 text-white transition duration-300 hover:bg-gray-900 dark:bg-white dark:text-black"
          >
            复制地址
          </button>
        </>
      ) : (
        <div>
          <h3 className="mb-6 text-lg font-semibold">全部充币记录</h3>
          <ScrollArea className="h-[400px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 text-left text-xs text-gray-600">
                  <th className="pb-2">币种/时间</th>
                  <th className="hidden pb-2 md:table-cell">地址</th>
                  <th className="pb-2 text-right">充币数量</th>
                  <th className="pb-2 text-right">充币状态</th>
                </tr>
              </thead>
              <tbody>
                {depositHistory.map((record, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 text-xs font-normal"
                  >
                    <td className="py-4">
                      <div className="mb-1 text-sm font-semibold">
                        {record.coin}
                      </div>
                      {record.time}
                    </td>
                    <td className="hidden py-4 md:table-cell">
                      {record.address}
                      <br />
                      <a href="#" className="mt-1 block text-green-600">
                        详情
                      </a>
                    </td>
                    <td className="py-4 text-right">{record.amount}</td>
                    <td className="py-4 text-right font-medium text-green-600">
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      )}
    </Card>
  )
}
