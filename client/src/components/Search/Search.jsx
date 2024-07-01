//Search component will be used to search for tracks.
//It will contain a search bar.
import { useEffect, useState } from "react";


const Search = () => {

    //State to store fetched data
  const [input,setInput]=useState("");

  //Function to fetch data from server
  const fetchData= async (value)=>{
    const response=await fetch('http://localhost:8000/autocomplete/'+value)
    const res=await response.json();
    console.log(res)
  }

  const handleChange=(value)=>{
    setInput(value)
    fetchData(value)
  }


  return (
    <div className="w-full">
        <div className="mx-auto">
        <input value={input} type="text" onChange={(e)=>handleChange(e.target.value)} className="mx-auto w-[80%] search" placeholder="Musify Here" />
        </div>
        
    </div>
  )
}

export default Search