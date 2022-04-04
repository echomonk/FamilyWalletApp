import { useEffect } from "react"
import useSWR from "swr"

const test =  "FORM IS WORKING"

export const handler = (web3, provider) => () => {

    const { data, mutate,  ...rest } = useSWR(() =>
      web3 ? "web3/form" : null,
      async () => {
        const formData = web3.eth.sendTransaction()
        return formData
      }
    )
    
    useEffect(() => {
        provider
        formData => mutate(formData ?? null)
    }, [provider])
    
    return {
      data,
      isTest: test,
      mutate,
      ...rest
    }

}

  //   addressTo: "",
  //   amount: "",
  //   keyword: "",
  //   message: "",
  // })
  // const handleChange = (e, name) => {
  //   setFormData((prevState) => ({...prevState, [name]: e.target.value}))
  // }