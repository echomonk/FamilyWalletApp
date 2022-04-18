import Button from "./button";
import Dashboard from "./Dashboard";

import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import { shortenAddress } from "@components/provider/web3/hooks/shortenAddress";
import { useEthPrice } from "@components/provider/web3/hooks/useEthPrice";
import { UseWeb3 } from "@components/provider";
import { UseAccount, useNetwork } from "@components/web3/hooks";
import { UseTxContext } from "@components/context/TransactionContext";


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


export default function Welcome() {
  const { connect, isLoading, isWeb3Loaded, web3 } = UseWeb3()
  const { formData, handleChange, sendTx } = UseTxContext()
  const { account } = UseAccount()
  const { network } = useNetwork()
  const { eth } = useEthPrice()

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData
    
    e.preventDefault()

    if(!addressTo || !amount || !keyword || !message ) return

    sendTx(web3)
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
                {/* 0x73784995de4aabF7F4AB74E7DCAEf30fFe76Bbd9 */}
                
                Please contact admin to be added on the wallet.
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
              
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} /> 
                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                <Input placeholder="Enter Message" name="keyword" type="text" handleChange={handleChange} />
                <Input placeholder="Keyword (gif)" name="message" type="text" handleChange={handleChange} /> 
              
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                
                { false ? (
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
  


