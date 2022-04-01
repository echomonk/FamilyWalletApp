import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import { useEffect, useState } from "react";
import { shortenAddress } from "@components/hooks/shortenAddress";
import { useEthPrice } from "@components/hooks/useEthPrice";
import { loadContract } from "@utils/loadContract";


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input 
    placeholder={placeholder}
    type={type}
    min="0.0000"
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
)


const Welcome = () => {
  const { eth } = useEthPrice()
 

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

  const handleSubmit = () => {

  }
     return (
      <div className="flex w-full justify-center items-start">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 text-center">
            <div className="flex flex-1 justify-start items-center flex-col">
            <h1 className="text-3xl text-center sm:text-5xl text-white text-gradient py-1">
              A family wallet app <br /> with independent transfer functionality.
            </h1>
            <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Explore the crypto world. Buy and sell cryptocurrencies easily.
            </p>
            </div>

              { web3Api.isProviderLoaded ? 
               (!web3Api.provider ?
                (<button
                    type="button"
                    className="flex flex-grow w-full justify-center items-center my-5 bg-orange-400 p-3 rounded-full cursor-pointer hover:bg-orange-500"
                    >
                      <AiFillPlayCircle className="text-white mr-2"/>
                    <p className="text-white text-base font-semibold">
                        Wallet is not detected.{` `}
                      <a target="_blank" rel="noopener noreferrer" href="https://docs.metamask.io">
                        Install Metamask!
                      </a>
                    </p>
                  </button>
                ) : (
                <button
                    type="button"
                    onClick={() =>
                      web3Api.provider.request({method: "eth_requestAccounts"}
                    )}
                    className="flex flex-grow w-full justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    >
                      <AiFillPlayCircle className="text-white mr-2"/>
                    <p className="text-white text-base font-semibold">
                        Connect Wallet
                    </p>
                </button>
                )) :
                <span className="flex flex-grow w-full justify-center items-center my-5 text-white text-base font-semibold bg-orange-400 p-3 rounded-full cursor-pointer hover:bg-orange-500">
                  Looking for web3...
                </span>
              }

              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                  Reliability
                </div>
                <div className={companyCommonStyles}>Security</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                  Ethereum
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                  Web 3.0
                </div>
                <div className={companyCommonStyles}>Low Fees</div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                  Blockchain
                </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-start w-full mf:mt-0 mt-10">
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="flex justify-between items-start">
                  { eth.data ?
                    <> 
                    <SiEthereum fontSize={21} color="#fff" />
                      <span className="text-white font-semibold text-sm">
                        = {eth.data} $
                      </span>
                    </> :
                   <Loader size="sm" />
                  }  
                  </div>  
                    <BsInfoCircle fontSize={17} color="#fff" />
                </div>

                <div>
                  <div className="flex">
                  <span className="text-white font-semibold text-sm">Account:</span>
                  <p className="text-white font-semibold text-sm">
                    { account ? 
                    (shortenAddress(account)) : 
                    "Not connected"}
                  </p>
                  </div>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>

                </div>
              </div>
            </div>



            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <Input placeholder="Address To" name="addressTo" type="text" handleChange={() => {}} /> 
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={() => {}} />
              <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={() => {}} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={() => {}} /> 

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {false ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send Now
                </button>
              )}
            </div>

          </div>
        </div>
      </div>  
    );
  }
  
export default Welcome;

