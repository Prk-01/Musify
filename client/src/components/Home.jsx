// The Home screen or the landing page of the application will be displayed using this component.
// The Home component will contain a search bar and an image.

import Search from "./Search/Search"
import { ReactTyped } from "react-typed";
import { typedConstants } from "../assets/homePageConstants";

// The search bar will be used to search for tracks.
const Home = () => {
  return (
    <section id="Home">
    <div className="text-white">
        <div className="max-w-[1440px] w-full mt-[-96px] h-screen mx-auto pt-[30vh]">
            <div className="w-full mx-auto grid md:grid-cols-2 gap-6 px-4">
                <div className="p-0 md:pl-12 h-auto md:h-[50vh] text-center md:text-justify">
                    <h1 className="md:text-3xl sm:text-2xl text-xl mb-6">Life is a journey,
                    {/* React Typing Animation */}
                    <br />
                    <ReactTyped strings={typedConstants} typeSpeed={80} backSpeed={80} loop />
                    </h1>
                    {/* Input Component needs to be added here */}
                    <Search />
                </div>  
                <div className="col-span-1 w-full">
                    {/* display results here */}
                    {/* cool gif but can be commerically used*/}
                    <img className="mx-auto w-[400px]  h-[100px] md:h-auto" src="https://i.pinimg.com/originals/3e/fe/1c/3efe1cb845954233246f60d5d8395dd0.gif" alt="Musify image" />
                </div>
             
            </div>
        </div>
    </div>
    </section>
  )
}

export default Home