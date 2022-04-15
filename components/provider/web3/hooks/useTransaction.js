import { useEffect } from "react"
import useSWR from "swr"


export const handler =  (web3, contract) => () =>{

    
    // const {data, mutate, ...rest} = useSWR (() => {
    //     (web3 && contract) ? "web3/transactions" : null,
    //     async () => {
            
    //         const receipt = await web3.eth.getTransactionReceipt().call()
    //         const txCount = await contract.methods.getTransactionCount().call()
    //         return txCount
    //     }
    // })

    // useEffect(() => {
       
    //     txCount => (mutate(txCount ?? null))
    // }, [])

    // return {
    //     data, 
    //     mutate,
    //     ...rest
    // }
}