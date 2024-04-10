import React, { useState, useEffect } from "react";
import HeroHome from "../components/HeroHome";
import HomeCard from "../components/HomeCard";
import AboutUs from "../components/AboutUs";

const LandingPage = () => {
  return (
    <>
      <HeroHome></HeroHome>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="m-10 flex flex-col items-center mx-auto max-w-screen-lg">
          {/* <div className="header flex w-full justify-center">
            <h2 className="font-black pb-10 mb-20 text-5xl text-pink-500 before:block before:absolute before:bg-sky-300  relative before:w-1/3 before:h-1 before:bottom-0 before:left-1/3">
              Recent Kick Starter Projects
            </h2>
          </div> */}
          <div className="text-center pb-12 md:pb-24">
            <h2 className="inline-block text-5xl text-pink-500 font-black relative after:content-[''] after:block after:w-20 after:h-1 after:bg-pink-500 after:absolute after:left-1/2 after:-translate-x-1/2 after:mt-3">
              Recent Kick Starter Projects
            </h2>
          </div>
          <HomeCard />
        </div>
      </div>
      <AboutUs />
    </>
  );
};

export default LandingPage;
