import React, { useState, useRef, useEffect } from "react";
// import Modal from "../utils/Modal";
import { Carousel, Typography, Button } from "@material-tailwind/react";

import HeroImage from "../image/events.jpg";
function HeroHome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const totalSlides = props.children.length;
  // const intervalDuration = 5000; // 5 seconds interval, adjust as needed

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % totalSlides;
  //     setCurrentIndex(nextIndex);
  //   }, intervalDuration);

  //   return () => clearInterval(intervalId);
  // }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // const handleSlideChange = (index) => {
  //   setCurrentIndex(index);
  // };
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Bring Your Creative Projects To{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Life!
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Ignite possibilities, launch dreams. Your journey to crowdfunded
                success starts here!
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <a
                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                    href="#0"
                  >
                    Explore Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div>
            {/* <div
              className="relative flex justify-center mb-8"
              data-aos="zoom-y-out"
              data-aos-delay="450"
            > */}
            {/* <div className="flex flex-col justify-center"> */}
            {/* <Carousel transition={{ duration: 2 }} className="rounded-xl">
              <img
                className="mx-auto"
                src={HeroImage}
                width="768"
                height="432"
                alt="Hero"
              />
              <img
                className="mx-auto"
                src={HeroImage2}
                width="768"
                height="432"
                alt="Hero"
              />
              <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="image 3"
                className="h-full w-full object-cover"
                width="768"
                height="432"
              />
          </Carousel>*/}
            <img
              className="mx-auto"
              src={HeroImage}
              width="768"
              height="432"
              alt="Hero"
            />
          </div>
        </div>
      </div>
      <Carousel transition={{ duration: 2 }} className="rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </section>
  );
}

export default HeroHome;
