import { useEffect } from "react"
import useSWR from "swr"

const beneficiaryAddress = {
  "0x2c2ebffc2b6f8fe74a3b84ce6f97671eb643cabda591649f6661bcf5670deaff": true,
  "0xe92dbd7b3bf75f577854c0133f320110a610358b71787ad59733064b10d33bdb": true
}

const adminAddresses = {
 "0x79a4bf16935602e50c7ec1f30f5b133e9749bc7c4cc735c0ba842e042956503b": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      return  accounts[0]
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
    isBeneficiary: (
      data &&
      beneficiaryAddress[web3.utils.keccak256(data)]) ?? false,
    isAdmin: (
      data && 
      adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
      ...rest
  }
}