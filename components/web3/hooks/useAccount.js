

import { useHooks } from "@components/provider/web3"

export const useAccount = () => {
  return useHooks(hooks => hooks.useAccount)()
}