import { useWeb3 } from "@components/provider";
import { Loader } from "@components/ui"
import { useAccount } from "@components/web3/hooks";
import { useState } from "react";



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

export default function SetForm() {

  const { connect, isLoading, isWeb3Loaded, contract, provider, providerUrl, web3} = useWeb3()
  const { account } = useAccount()

  const toBN = value => web3.utils.toBN(value)
  const toWei = value => web3.utils.toWei(String(value))


  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }))
  };

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData
    
    e.preventDefault()

    if(!addressTo || !amount || !keyword || !message ) return

    sendTx(web3);
  }
  
  const sendTx = async (web3) => {
    if (web3) {
      const { addressTo, amount, keyword, message } = formData;
      const parsedAmount = web3.utils.toWei(amount, "ether");
      let data = {from: account.data,to: addressTo,gas: "0x5208",value: parsedAmount};
      data = JSON.parse(JSON.stringify(data));
      try {
          await web3.eth.sendTransaction(data);
      } catch (error) {
        console.log(error)
        throw new Error("No ethereum object");
      }
    }
  }
  return (
      
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} /> 
        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} /> 
       
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
    )
}

// 0x73784995de4aabF7F4AB74E7DCAEf30fFe76Bbd9