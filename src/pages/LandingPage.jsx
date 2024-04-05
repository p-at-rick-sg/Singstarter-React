import React, { useState, useEffect } from "react";
import HeroHome from "../components/HeroHome";
import HomeCard from "../components/HomeCard";
import AboutUs from "../components/AboutUs";

const LandingPage = (props) => {
  return (
    <>
      <HeroHome></HeroHome>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="m-10 flex flex-col items-center mx-auto max-w-screen-lg">
          <div className="header flex w-full justify-center">
            <h2 className="font-black pb-10 mb-20 text-5xl text-pink-500 before:block before:absolute before:bg-sky-300  relative before:w-1/3 before:h-1 before:bottom-0 before:left-1/3">
              Recent Kick Starter Projects
            </h2>
          </div>
          <HomeCard
            createdDate={props.createdDate}
            getProject={props.getProject}
          />
        </div>
      </div>
      <AboutUs />
    </>
  );
};

export default LandingPage;
