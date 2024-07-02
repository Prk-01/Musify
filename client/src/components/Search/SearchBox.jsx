//SearchBox component to display the search completions


const SearchBox = ({ completions }) => {

  return (
    <div className="text-white w-[80%] mx-auto  md:mx-0 max-h-[300px] h-auto mt-1 overflow-y-scroll">
        {
        /*Get the results and display */
            completions.map((completion,index)=>(
                <div key={index} className="m-2 px-2 flex flex-col justify-center hover:bg-slate-600">
                <span>{completion[0]}</span>
                </div>
            ))
        }
    </div>
  ) 
}

export default SearchBox