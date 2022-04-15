import { UseTxContext } from "@components/context/TransactionContext";
import { UseWeb3 } from "@components/provider";
import { UseAccount, useNetwork } from "@components/web3/hooks";
import Tabs from "./tabs";

// const Input = ({ placeholder, name, type, value, handleChange }) => (
//   <input 
//     placeholder={placeholder}
//     type={type}
//     min="0.0000"
//     step="0.0001"
//     value={value}
//     onChange={(e) => handleChange(e, name)}
//     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
//   />
// )

// const LINKS = [{
//   href: "/walletpanel/addAllowance",
//   value: "Add Allowance",
//   requireAdmin: true
// }, {
//   href: "/walletpanel/reduceAllowance",
//   value: "Reduce Allowance",
//   requireAdmin: true
// }, {
//   href: "/walletpanel/withdraw",
//   value: "Withdraw"
// }]

const Dashboard = ({}) => {
  const { connect, isLoading, isWeb3Loaded, web3 } = UseWeb3()
  const { handleChange1, formData, formData2, sendTx } = UseTxContext()
  const { account } = UseAccount()
  const { network } = useNetwork()
  // const { tx } = useTransactions()

  const handleSubmit = (e) => {
    const { addressTo, amount } = formData2
    
    e.preventDefault()

    if(!addressTo || !amount) return

    sendTx(web3)
  }

    return (
      <div className="flex flex-col w-full justify-center items-center my-5 p-3 blue-glassmorphism">
          <span className="flex flex-col w-full justify-center items-center my-5 p-1 text-base font-semibold white-glassmorphism">
          { account.isAdmin ?
            <span
              className="flex flex-grow w-full justify-center items-center my-0.5 p-2 rounded-full bg-orange-400 hover:bg-orange-500 text-white text-base font-semibold">
              Welcome Admin
            </span> :
            <>
            </>
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
                Allowance:
              </div>
              <Tabs />
      </div>
      
    );
  }
  
  export default Dashboard;

 // p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism