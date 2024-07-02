//Search component will be used to search for tracks.
//It will contain a search bar.
import {useState } from "react";
import SearchBox from "./SearchBox";


const Search = () => {

    //State to store fetched data
  const [input,setInput]=useState("");
  const [completions,setCompletions]=useState([]);
  const [valuelength,setValuelength]=useState(0);

  //Function to fetch data from server
  const fetchData= async (value)=>{
    setValuelength(value.length)
    //If the input is not empty dont fetch data
    if (value.length > 0)
      {
      const response=await fetch('http://localhost:8000/autocomplete/'+value)
      const res=await response.json();
      setCompletions(res.results)
    }
    else{
      setCompletions([])
    }
    
  }
//Event to fetch suggestions
  const getSuggestions=(event)=>{
    let value=event.target.value;
    setInput(value)
    fetchData(value)
  }

  //Sample output when suggestion is selected
  const handleSubmit=(event)=>{
    event.preventDefault();
    window.open('https://www.youtube.com/results?search_query='+input, '_blank');
    setInput("")
    setCompletions([])
  }



  return (
    <div className="w-full">
        <div className="mx-auto">
          <form onSubmit={handleSubmit}>
          <input value={input} type="text" onChange={(event)=>getSuggestions(event)} className="mx-auto w-[80%] search" placeholder="Musify Here" />
          <SearchBox completions={completions} valuelength={valuelength}/>
        </form>
        </div>
        
    </div>
  )
}

export default Search