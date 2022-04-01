const SIZES = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-16 h-16"
}

const Loader = ({ size = "lg"}) => {
    return (
       <div className={`flex justify-center items-center py-3 ${SIZES[size]}`}>
         <div className={`animate-spin rounded-full ${SIZES[size]} border-b-2 border-red-700`}/>
       </div>
    );
}

export default Loader;