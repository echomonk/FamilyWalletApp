import { UseTxContext } from "@components/context/TransactionContext"
import { UseWeb3 } from "@components/provider"
import Loader from "../../ui/Loader"

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


const addAllowance  = () => { 
  const { web3 } = UseWeb3()
  const { handleChange, formData, addAllowance } = UseTxContext()


  const handleSubmit = (e) => {
    const { addressTo, amount } = formData
    
    e.preventDefault()

    if(!addressTo || !amount) return

    addAllowance(web3)
  }

    
  return (
    <div>
        <Input placeholder="Address to" name="addressTo" type="text" handleChange={handleChange} />
        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
        <div className="h-[1px] w-full bg-gray-400 my-2" />
        { false ? (
        <Loader />  
        ) : (
        <button
            type="button"
            onClick={handleSubmit}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
        >
            Add Allowance
        </button>             
        )}
    </div>
 )
}

export default addAllowance;