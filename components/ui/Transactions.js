import { SetForm } from "@components/context";
import { useWeb3 } from "@components/provider";
import { shortenAddress } from "@components/provider/web3/hooks/shortenAddress";
import { useAccount } from "@components/web3/hooks";
import dummyData from "@utils/dummyData";
import { useContext } from "react";





const Transactions = () => {
const { web3 } = useWeb3()
const { account } = useAccount()

    return (
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4">
            { account.data ? (
              <h3 className="text-white text-3xl text-center my-2">
                Latest Transactions
              </h3>
              ) : (
              <h3 className="text-white text-3xl text-center my-2">
                Connect your account to see the latest transactions
              </h3>
            )}
            <div className="flex flex-wrap justify-center items-center mt-10">
          {dummyData.reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
            </div>
        </div>
      </div>
    );
  }
  
  export default Transactions;