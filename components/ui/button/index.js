import { AiFillPlayCircle } from "react-icons/ai";


export default function Button({ 
    children,
    className = "bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold",
    ...rest
}) {
 
  return (
    <span
        {...rest}
        className={`flex flex-grow w-full justify-center items-center my-5 p-3 rounded-full cursor-pointer ${className}`}>
        <AiFillPlayCircle className="text-white mr-2"/>
         {children}
    </span>
  )
}
