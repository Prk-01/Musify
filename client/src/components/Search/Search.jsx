//Search component will be used to search for tracks.
//It will contain a search bar and its results.
import {useState } from "react";
import SearchBox from "./SearchBox";


const Search = () => {

   //State to store user input
  const [input,setInput]=useState("");
  //State to store completions(data fetched from server)
  const [completions,setCompletions]=useState([]);
  //State to store the length of the input
  const [valuelength,setValuelength]=useState(0);
  //State to store if the input is valid or not
  const [notvalid,setNotValid]=useState(false);

  //Function to fetch data from server
  const fetchSuggestions= async (value)=>{
    setValuelength(value.length)
    //If the input is not empty dont fetch data
    if (value.length > 0)
      {
      //fetch data from server
      const response=await fetch('http://localhost:8000/autocomplete/'+value)
      const res=await response.json();
      setCompletions(res.results)
    }
    else{
      //if no input then set completions to empty
      //dont fetch and no suggestions
      setCompletions([])
    }
    
  }

//Event to fetch suggestions
  const getSuggestions=(event)=>{
    let value=event.target.value;
    //state updated to check if the input is valid or not
    setNotValid(false)
    //set the input
    setInput(value)
    //fetch suggestions
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
    //reset the input and completions
    setInput("")
    setCompletions([])
  }



  return (
    <div className="w-full">
        <div className="mx-auto">
          {/* Search box and results */}
          <form onSubmit={handleSubmit}>
          <input value={input} type="text" onChange={(event)=>getSuggestions(event)} className="mx-auto w-[80%] search" placeholder="Musify Here" />
          {/* error message for invalid input submission */}
          {notvalid && <p className="text-red-500 text-sm ps-2 pt-2">Apologies, We dont have that on Musify yet!</p>}
          {/* search results */}
          <SearchBox completions={completions} valuelength={valuelength}/>
        </form>
        </div>
        
    </div>
  )
}

export default Search