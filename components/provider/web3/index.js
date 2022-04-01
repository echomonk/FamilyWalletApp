import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { loadContract } from "@utils/loadContract";
const { createContext, useContext } = require("react");

const Web3Context = createContext(null)

export default function Web3Provider({children}) {

  const [web3Api, setweb3Api] = useState({
    provider: null,
    web3: null,
    isProviderLoaded: false
  })

  const [account, setAccount] = useState(null)

  const setAccountListener = provider => {
    provider.on("accountsChanged", accounts => setAccount(accounts[0]))
  }


  useEffect(() => {
    const loadProvider = async () => {
      const web3 = new Web3(provider)
      const provider = await detectEthereumProvider()

      if (provider) {
        const contract = await loadContract("FamilyWallet", web3)

        setAccountListener(provider)
        setweb3Api({
          provider,
          contract,
          isProviderLoaded: true
        });
      } else {
        setweb3Api({...web3Api, isProviderLoaded: true})
        console.error("Please, install Metamask.")
      }
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccount();
  }, [web3Api.web3])

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}