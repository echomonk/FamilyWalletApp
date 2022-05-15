import { useEffect } from "react"
import useSWR from "swr"

const beneficiaryAddress = {
  "0x78eef18bd85a1a52b35693576303f610b00e090c0d98152642b9040fc0609359": true,
  "0xe92dbd7b3bf75f577854c0133f320110a610358b71787ad59733064b10d33bdb": true
}

const adminAddress = {
 "0x763c3c50bbc55e58e438858934e3b67c0db6aac912bbab03bd94e6959e38fa96": true
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
      adminAddress[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest
  }
}