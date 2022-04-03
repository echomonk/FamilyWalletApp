import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
 "0x79a4bf16935602e50c7ec1f30f5b133e9749bc7c4cc735c0ba842e042956503b": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      return accounts[0]
    }
  )

  useEffect(() => {
    provider &&
    provider.on("accountsChanged",
      accounts => mutate(accounts[0] ?? null)
    )
  }, [provider])

  return { 
    data,
    isAdmin: (
      data && 
      adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
      ...rest
  }
}