import { useHooks } from "@components/provider/web3"


const enhanceHook = swrRes => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes.data || swrRes.error
  }
}

export const useNetwork = () => {
  const swrRes = enhanceHook(useHooks(hooks => hooks.useNetwork)())
    return {
        network: swrRes
    }
}

export const UseAccount = () => {
  const swrRes = enhanceHook(useHooks(hooks => hooks.UseAccount)())
    return {
        account: swrRes
    }
}