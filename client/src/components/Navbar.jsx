import { AiOutlineMenuUnfold,AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
    const [nav,setNav]=useState(true);

    const handleNav=()=>{
        setNav(!nav)
    }
  return (
    <nav>
        <div className="text-white flex justify-between items-center h-24 mx-auto px-4 max-w-[1440px]">
            <h1 className="w-full text-3xl"><span className="brand font-bold">Musify</span></h1>
            <ul className="hidden md:flex">
                <li className="p-4"><a href="#Home">Home</a></li>
                <li className="p-4"><a href="#Tracks">Tracks</a></li>
                <li className="p-4"><a href="#About">About</a></li>
            </ul>
            <div onClick={handleNav} className="block md:hidden">
                {!nav?<AiOutlineClose size={24}/>:<AiOutlineMenuUnfold size={24}/>}
            </div>
            <div className={!nav?'fixed md-hidden left-0 top-0 w-[60%] h-full bg-black' : 'fixed hidden'}>
            <ul className="pt-24">
                <li className="p-4" onClick={handleNav}><a href="#Home">Home</a></li>
                <li className="p-4" onClick={handleNav}><a href="#Tracks">Tracks</a></li>
                <li className="p-4"  onClick={handleNav}><a href="#About">About</a></li>
            </ul>
            </div>
        </div>
    </nav>
    
  )
}

export default Navbar