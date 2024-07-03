// Tracks component
// Card Carousel to find tracks by artists for now can be extended to genres and other filters.
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { CgPlayTrackNextO } from "react-icons/cg";
import { IoArrowUpCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { images } from "../assets/constants";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const Tracks = () => {

  //State to store fetched data
  const [data,setData]=useState([])

  //Function to fetch data from server
  const fetchData= async ()=>{
      const response=await fetch('http://localhost:8000/data')
      if(response.ok){
        const res=await response.json();
        setData(res.data)
      }
      else{
        //if no response then set data to empty
        setData([])

      }
      
  }

  //UseEffect to fetch data on component mount
  useEffect(()=>{
    fetchData()
  },[])

  //Test for state change
  // console.log(data.data)

  //   //dummy data for now
  //   const dummyData = ['Artist1','Artist2','Artist3','Artist4']
  return (
    <section id='Tracks'>
    <div className="flex flex-col h-screen bg-[#E9E2CE] text-[#E3A47A] justify-center items-center">
        <div className="max-w-[1440px] w-full mx-auto ">
        <h1 className="text-4xl font-bold pb-20 pl-4">Search Tracks by Artist</h1>
        {/* card carousel to find tracks by artists for now can be extended to genres and other filters. */}
      <Swiper
        breakpoints={{
          //settting breakpoints for the carousel
          280: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
            720: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {/* Mapping the data to the carousel form api response */}
        {data.map((artist,item) => (
          <SwiperSlide key={item}>
            <div className="mx-auto flex flex-col gap-6 mb-20 group relative shadow-lg text-white px-6 py-8 h-[250px] w-[215px] lg:h-[320px] lg:w-[280px] xl:h-[350px] xl:w-[300px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${images[item]})` }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                <h1 className="text-xl lg:text-2xl group-hover:text-[#E3A47A] duration-100">{artist.name} </h1>
              </div>
              <CgPlayTrackNextO className="absolute bottom-5 left-5 w-[40px] h-[40px] text-white group-hover:text-[#E3A47A] duration-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      {/* Go back to top */}
      <div className="mt-10">
        <a href="#Home"><IoArrowUpCircle size={32} className="w-12 h-12 hover:text-black animate-bounce" /></a>
    </div>
    </div>
    </section>
  );
};

export default Tracks;