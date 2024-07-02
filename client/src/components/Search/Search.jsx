//Search component will be used to search for tracks.
//It will contain a search bar.
import {useState } from "react";
import SearchBox from "./SearchBox";


const Search = () => {

    //State to store fetched data
  const [input,setInput]=useState("");
  const [completions,setCompletions]=useState([]);

  //Function to fetch data from server
  const fetchData= async (value)=>{
    if (value.length > 0)
      {
      const response=await fetch('http://localhost:8000/autocomplete/'+value)
      const res=await response.json();
      setCompletions(res.results)
    }
    
  }

  const handleChange=(value)=>{
    setInput(value)
    fetchData(value)
  }


  return (
    <div className="w-full">
        <div className="mx-auto">
        <input value={input} type="text" onChange={(e)=>handleChange(e.target.value)} className="mx-auto w-[80%] search" placeholder="Musify Here" />
        <SearchBox completions={completions}/>
        </div>
        
    </div>
  )
}

export default Search