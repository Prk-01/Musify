//SearchBox component to display the search completions


const SearchBox = ({ completions,valuelength }) => {

    const handleChange=(e)=>{
        console.log(e.target.id)
    }

  return (
    <div className="text-white w-[80%] mx-auto  md:mx-0 max-h-44 mt-1 overflow-y-auto custom-scrollbar">
        {
        /*Get the results and display */
            completions.map((completion,index)=>(
                // lets rediret it the selected option to youtube for now
                <div key={index} id={index} className=" bg-[#1A1A17] m-2 px-2 justify-center hover:bg-slate-600" onClick={(e)=>handleChange(e)}>
                    {/* To highlight the search results */}
                <span>{completion[0].slice(0,valuelength)}</span><span className="font-bold">{completion[0].slice(valuelength)}</span>
                </div>
            ))
        }
    </div>
  ) 
}

export default SearchBox