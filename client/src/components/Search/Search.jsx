//Search component will be used to search for tracks.
//It will contain a search bar.
import {useState } from "react";
import SearchBox from "./SearchBox";


const Search = () => {

    //State to store fetched data
  const [input,setInput]=useState("");
  const [completions,setCompletions]=useState([]);
  const [valuelength,setValuelength]=useState(0);
  const [notvalid,setNotValid]=useState(false);

  //Function to fetch data from server
  const fetchSuggestions= async (value)=>{
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
    setNotValid(false)
    setInput(value)
    fetchSuggestions(value)
  }





  //Sample output when suggestion is selected
  const handleSubmit=(event)=>{
    event.preventDefault();
    //check if the input is valid or not
    //Note: if the input then we would have completions
    //Valid inputs will be redirected to youtube
    if (completions.length>0)
    {
      window.open('https://www.youtube.com/results?search_query='+input, '_blank');
    }
    else{
      setNotValid(true)
    }
    setInput("")
    setCompletions([])
  }



  return (
    <div className="w-full">
        <div className="mx-auto">
          <form onSubmit={handleSubmit}>
          <input value={input} type="text" onChange={(event)=>getSuggestions(event)} className="mx-auto w-[80%] search" placeholder="Musify Here" />
          {notvalid && <p className="text-red-500 text-sm ps-2 pt-2">Apologize, We dont have that on Musify yet!</p>}
          <SearchBox completions={completions} valuelength={valuelength}/>
        </form>
        </div>
        
    </div>
  )
}

export default Search