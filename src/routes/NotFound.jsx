import React from 'react';
import errorPhoto from '../assets/error-404.png'

const NotFound = () => {
    return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <img src={errorPhoto} alt="" className="w-6/12" />
        <div className="text-center mt-5">
        <h3 className="text-2xl font-semibold">Oops, page not Found! </h3>
        <p className="text-xs py-2 pb-4 text-gray-400">The page you are looking for is not available</p>
        <button className=" bg-linear-to-br from-[#632EE3] to-[#9F62F2] py-1 px-5 rounded text-white"><a href="/"> Go Back!</a></button>
      </div>
      </div>

      
    </>
  
    );
};

export default NotFound;