import { UseTxContext } from "@components/context/TransactionContext";
import { UseAccount, useNetwork } from "@components/web3/hooks";
import Tabs from "./tabs";

const Dashboard = ({}) => {
  const { account } = UseAccount()
  const { network } = useNetwork()
  const { allowance } = UseTxContext()

    return (
      <div className=" flex flex-1 flex-col items-center justify-start w-full mf:mt-0 mt-10">
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <span className="flex flex-col w-full justify-center items-center my-5 p-1 text-base font-semibold white-glassmorphism">
          { account.isAdmin ?
            <span
              className="flex flex-grow w-full justify-center items-center my-0.5 p-2 rounded-full bg-orange-400 hover:bg-orange-500 text-white text-base font-semibold">
              Welcome Admin
            </span> :
            <></>
          } 
          { network.hasInitialResponse && !network.isSupported &&
             <div className="my-0.5 w-full rounded-full p-2 outline-none bg-transparent text-red-500 border-none text-sm white-glassmorphism">
               Wrong network! Connect to:  {network.target}
               </div>
           }
          { network.data &&
            <div className="my-0.5 w-full rounded-full p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism">
              Currently on: {network.data}
              </div>
          }

          </span>
              <div className="my-0.5 w-full rounded-full p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism">
                Allowance: { allowance } ETH
              </div>
              <Tabs />
        </div>
      </div>
    );
  }
  
  export default Dashboard;