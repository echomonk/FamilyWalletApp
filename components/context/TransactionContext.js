import React from "react"
import { UseWeb3 } from "@components/provider"
import { UseAccount } from "@components/web3/hooks"
import { useState, useContext, useEffect, createContext } from "react"


const TransactionContext = createContext(null)

export default function TransactionProvider({ children }) {
  const { contract, web3 } = UseWeb3()
  const { account } = UseAccount()
  const [transactions, setTransactions] = useState([])
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
  const [t_count, setT_count] = useState(0)



  const addAllowance = async() => {
    if (web3) {
      const { addressTo, amount } = formData
      const parsedAmount = web3.utils.toWei(amount, "ether")
      const data = {from: account.data, to: addressTo, gas: "0x5208", value: parsedAmount}
      data = JSON.parse(JSON.stringify(data))
        try {
          await contract.methods.addAllowance(
            addressTo,
            parsedAmount
          ).send({from: account.data})
        } catch (error) {
          console.log(error)
        }
    }
  }

  const reduceAllowance = async () => {
    if (web3) {
      const { addressTo, amount } = formData
      const parsedAmount = web3.utils.toWei(amount, "ether")
      const data = {from: account.data, to: addressTo, gas: "0x5208", value: parsedAmount}
      data = JSON.parse(JSON.stringify(data))
        try {
          await contract.methods.reduceAllowance(
            addressTo,
            parsedAmount
          ).send({from: account.data})
        } catch (error) {
          console.log(error)
        }
    }
  }


  const withdraw= async () => {
    if (web3) {
      const { addressTo, amount } = formData
      const parsedAmount = web3.utils.toWei(amount, "ether")
      const data = {from: account.data, to: addressTo, gas: "0x5208", value: parsedAmount}
      data = JSON.parse(JSON.stringify(data))
      try {
        await contract.methods.withdrawMoney(
          addressTo,
          parsedAmount
        ).send({from: account.data})
      } catch (error) {
        console.log(error)
      }
    }
  }

  const sendTx = async (web3) => {
    if (web3) {
      const { addressTo, amount, keyword, message } = formData
      const parsedAmount = web3.utils.toWei(amount, "ether")
      const data = {from: account.data, to: addressTo, gas: "0x5208", value: parsedAmount}
      data = JSON.parse(JSON.stringify(data))
        try {
          await web3.eth.sendTransaction((data), function(err, transactionHash) {
            if (!err)
            console.log(transactionHash)
            web3.eth.getTransactionReceipt(transactionHash)
          })
          await contract.methods.addToBlockchain(
            addressTo,
            parsedAmount,
            keyword,
            message
            ).send({from: account.data})
            try {
              let t_count = window.sessionStorage.getItem("t_count");
              window.sessionStorage.setItem("t_count", t_count+1);
              }catch (error){
              window.sessionStorage.setItem("t_count", 1);
              }
            // window.location.reload()
          } catch (err) {
            console.log(err)
          }
     }
  }
      
  const getAllTransactions = async (web3) => {
      if (web3 && account.data !== null) {
        try {
          const txList = await contract.methods.getAllTransactions().call()
            const structuredTransactions = txList.map((transaction) => ({
              addressFrom: transaction.sender,
              addressTo: transaction.receiver,
              amount: parseInt(transaction.amount) / (10 ** 18),
              message: transaction.message,
              timestamp: new Date(transaction.timestamp*1000).toLocaleDateString(),
              keyword: transaction.keyword
            }))
            setTransactions(structuredTransactions) 
        } catch (error) {
          console.log("No Transactions")
        }
      }
    }
    
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }))
  };
  useEffect(() => {
      getAllTransactions(web3)
  }, [account.data])

  return (
      
      <TransactionContext.Provider value={{ 
          transactions,
          formData,
          handleChange,
          sendTx,
          reduceAllowance,
          addAllowance,
          withdraw
        }}>
          {children}
      </TransactionContext.Provider>
   
    )
}

export function UseTxContext() {
    return useContext(TransactionContext)
}











// 0x73784995de4aabF7F4AB74E7DCAEf30fFe76Bbd9

{/* <TransactionContext.Provider value={{ transactions }}>
{children}
</TransactionContext.Provider> */}



// const [transactionCount, setTransactionCount] = useState("")
  // console.log(transactionCount)
  
  
 
  // useEffect(() => {  
  //   const transactionCount = window.localStorage.getItem("transactionCount")
  //   if (transactionCount !== 0 ) {
  //     setTransactionCount(transactionCount)}
  // }, [transactionCount])
  
  // useEffect(() => {
  //   const transactionCount = await contract.methods.getTransactionCount().call()
  //   window.localStorage.setItem("transactionCount", parseInt(transactionCount))
  // }, [])
  

  
  // const checkIfTransactionsExist = async () => {
  //   try {
  //     if (web3) {
  //       const currentTransactionCount = await contract.methods.getTransactionCount();
  //       window.localStorage.setItem("transactionCount", JSON.stringify(currentTransactionCount));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("No ethereum object");
  //   }
  // };





  // const [result, setResult] = useState("")
  // console.log(result)


  // useEffect(() => {
  //   if (web3) {
  //     contract.methods.getTransactionCount().call({from: account.data}, function(error, result) {
  //       setResult(parseInt(result))
  //     })
  //     if (typeof window === "undefined") {
  //       localStorage.getItem("result")
  //     } 
  //     // else {
  //     //   //   setResult(JSON.parse(localStorage.setItem("result")))
  //     //   } 
  //   }
  // }, [result])
  

  // useEffect(() => {
  //   if (web3) {
  //     contract.methods.getTransactionCount().call({from: account.data}, function(error, result) {
  //       setResult(parseInt(result))
  //     })
  //     if (localStorage.getItem("result")) {
  //       setResult(JSON.parse(localStorage.getItem("result")))
  //     } 
  //   }
  // }, [])

 