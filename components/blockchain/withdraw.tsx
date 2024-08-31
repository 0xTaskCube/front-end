import { Fragment, useState } from "react"
import {
  Dialog,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { ScrollArea } from "@radix-ui/react-scroll-area"

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

interface WithdrawHistory {
  time: string
  address: string
  coin: string
  amount: string
  status: string
}

const coin: Coin[] = [
  {
    id: 1,
    name: "USDT",
    avatar:
      "https://pbs.twimg.com/profile_images/1522267869920247809/uFYLh_nU_400x400.png",
  },
  // 你可以添加更多代币...
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

const withdrawHistory: WithdrawHistory[] = [
  {
    time: "2024/08/30 14:18:32",
    address: "0x123...abc",
    coin: "USDT",
    amount: "500",
    status: "Completed",
  },
  // 你可以添加更多提现记录...
]

export function WithdrawForm() {
  const [selectedCoin, setSelectedCoin] = useState(coin[0]) // 默认选中第一个代币
  const [selectedNetwork, setSelectedNetwork] = useState(netWork[0]) // 默认选中第一个网络
  const [withdrawAddress, setWithdrawAddress] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [userBalance, setUserBalance] = useState("1000.00 USDT") // 假设用户余额为 1000 USDT
  const [networkFee, setNetworkFee] = useState("10 USDT") // 假设网络费用为 10 USDT
  const [finalAmount, setFinalAmount] = useState("990 USDT") // 到账数量
  const [showModal, setShowModal] = useState(false)
  const [showWithdrawHistory, setShowWithdrawHistory] = useState(false)

  const handleWithdraw = () => {
    if (!withdrawAddress || !withdrawAmount) {
      setShowModal(true)
      return
    }

    // 处理提现请求，比如调用API
    console.log("提现代币:", selectedCoin.name)
    console.log("提现网络:", selectedNetwork.name)
    console.log("提现地址:", withdrawAddress)
    console.log("提现金额:", withdrawAmount)
    console.log("网络费用:", networkFee)
    console.log("最终到账数量:", finalAmount)

    setShowModal(true) // 展示自定义弹窗
  }

  return (
    <Card className="mx-auto w-full rounded-lg p-6 pb-4 shadow-lg">
      <div className="mb-6 flex justify-between space-x-2">
        <button
          className={`rounded-full px-4 py-2 text-sm ${
            !showWithdrawHistory
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowWithdrawHistory(false)}
        >
          提现
        </button>
        <button
          className={`rounded-full px-4 py-2 text-sm ${
            showWithdrawHistory
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowWithdrawHistory(true)}
        >
          记录
        </button>
      </div>

      {!showWithdrawHistory ? (
        <>
          <h3 className="mb-6 text-lg font-semibold">提现</h3>

          <div className="mb-4">
            <Listbox value={selectedCoin} onChange={setSelectedCoin}>
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                提现代币
              </Label>
              <div className="relative mt-2">
                {selectedCoin && (
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                      <img
                        alt=""
                        src={selectedCoin.avatar}
                        className="h-5 w-5 shrink-0 rounded-full"
                      />
                      <span className="ml-3 block truncate">
                        {selectedCoin.name}
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
                  {coin.map((coin) => (
                    <ListboxOption
                      key={coin.id}
                      value={coin}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-800 data-[focus]:text-white"
                    >
                      <div className="flex items-center">
                        <img
                          alt=""
                          src={coin.avatar}
                          className="h-5 w-5 shrink-0 rounded-full"
                        />
                        <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                          {coin.name}
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
                提现网络
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

          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              提现地址
            </label>
            <input
              type="text"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder="请输入提现地址"
              className="mt-2 w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              提现金额
            </label>
            <div className="relative mt-2 flex items-center">
              <input
                // type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="请输入提现金额"
                className="w-full rounded-md border-gray-300 py-2 pl-3 pr-20 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <div className="absolute right-3 flex items-center space-x-2 text-gray-500">
                <span>{selectedCoin.name}</span>
                <span>|</span>
                <button
                  onClick={() => setWithdrawAmount(userBalance.split(" ")[0])}
                  className="text-sm "
                >
                  全部
                </button>
              </div>
            </div>

            <p className="mt-1 text-xs text-gray-500">余额: {userBalance}</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-900">网络费用:</p>
              <span className="text-sm font-semibold text-gray-900">
                {networkFee} {selectedCoin.name}
              </span>
            </div>
            <div className="mt-2 flex justify-between">
              <p className="text-sm text-gray-900">到账数量:</p>
              <span className="text-sm font-semibold text-gray-900">
                {finalAmount} {selectedCoin.name}
              </span>
            </div>
          </div>

          <button
            onClick={handleWithdraw}
            className="w-full rounded-md bg-gray-800 py-2 text-white transition duration-300 hover:bg-gray-900"
          >
            提现
          </button>

          {/* 自定义弹窗 */}
          <Transition appear show={showModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowModal(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        提现确认
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          确认提现 {withdrawAmount} {selectedCoin.name} 到地址{" "}
                          {withdrawAddress} 吗？
                        </p>
                      </div>

                      <div className="mt-4 flex space-x-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          onClick={() => setShowModal(false)}
                        >
                          取消
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          onClick={() => {
                            setShowModal(false)
                            // 这里可以添加实际的提现逻辑
                          }}
                        >
                          确认
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <div>
          <h3 className="mb-6 text-lg font-semibold">提现记录</h3>
          <ScrollArea className="h-[400px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 text-left text-xs text-gray-600">
                  <th className="pb-2">币种/时间</th>
                  <th className="hidden pb-2 md:table-cell">地址</th>
                  <th className="pb-2 text-right">提币数量</th>
                  <th className="pb-2 text-right">状态</th>
                </tr>
              </thead>
              <tbody>
                {withdrawHistory.map((record, index) => (
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
