


import { handler as createAccountHook } from "./UseAccount";
import { handler as createNetworkHook } from "./useNetwork";
import { handler as createFormHook } from "./useForm";
import { handler as createTransactionsHook } from "./useTransaction";

export const setupHooks = (...deps) => {
  return {
    UseAccount: createAccountHook(...deps),
    useNetwork: createNetworkHook(...deps),
    useForm: createFormHook(...deps),
    useTransaction: createTransactionsHook(...deps),
  }
}