import Button from "./button";
import Dashboard from "./Dashboard";

import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import { shortenAddress } from "@components/provider/web3/hooks/shortenAddress";
import { useEthPrice } from "@components/provider/web3/hooks/useEthPrice";
import { useWeb3 } from "@components/provider";
import { useAccount, useNetwork } from "@components/web3/hooks";
import { SetForm } from "@components/context";


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";


export default function Welcome() {
  const { connect, isLoading, isWeb3Loaded } = useWeb3()
  const { account } = useAccount()
  const { network } = useNetwork()
  const { eth } = useEthPrice()
 
  
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
              
            { !account.data ?
              (isLoading ? 
                  <Button
                    onClick={connect}>
                    Loading...
                  </Button> :
                isWeb3Loaded ?
                  <Button
                    onClick={connect}>
                    Connect
                  </Button> :
                    <Button
                    onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                    Install Metamask
                  </Button>
                ) :
                <></>
             }
              { account.data && account.hasInitialResponse ?
                <Dashboard network={network.data} /> :
               <></>
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

                    {account.data ? 
                    (shortenAddress(account.data)) : 
                    "Not connected"}

                  </p>
                  </div>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>

                </div>
              </div>
            </div>
            
            <SetForm />

          </div>
        </div>
      </div>  
    );
  }
  


