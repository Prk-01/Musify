//SearchBox component to display the search completions


const SearchBox = ({ completions,valuelength }) => {

    //Sample output when suggestion is seleted
    //Function to handle the click on the search completions redirecting to youtube
    const handleChange=(id)=>{
        let selectedOption=completions[id];
        window.open('https://www.youtube.com/results?search_query='+selectedOption, '_blank');
        // console.log(e)
    }

  return (
    <div className="text-white w-[80%] mx-auto  md:mx-0 max-h-48 mt-1 overflow-y-auto custom-scrollbar text-start">
        {
        /*Get the results and display */
        
            completions.map((completion,index)=>(
                // lets rediret it the selected option to youtube for now
                <div key={index} id={index} className=" bg-[#1A1A17] m-2 px-2 justify-center hover:bg-slate-600 rounded-md" onClick={(e)=>handleChange(e.currentTarget.id)}>
                    {/* To highlight the search results */}
                <span>{completion.slice(0,valuelength)}</span><span className="font-bold">{completion.slice(valuelength)}</span>
                </div>
            ))
        }
    </div>
  ) 
}

export default SearchBox