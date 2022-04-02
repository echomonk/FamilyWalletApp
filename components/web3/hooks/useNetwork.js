


import { useHooks } from "@components/provider/web3"

export const useNetwork = () => {
  return useHooks(hooks => hooks.useNetwork)()
}