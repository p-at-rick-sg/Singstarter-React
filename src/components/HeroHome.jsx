import React, { useState, useEffect } from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import useFetch from "../hooks/useFetch";

function HeroHome() {
  const [projects, setProjects] = useState([]);
  const fetchData = useFetch();

  const getProjects = async () => {
    try {
      const res = await fetchData("/api/projects", "GET");

      if (res.ok) {
        setProjects(res.data);
        console.log(res.data[0]._id);
        console.log("all data shown", res.data);
        console.log(`Projects fetched successfully`);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProjects();
  }, []);

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
                    href="#0"
                    className="inline-block px-6 py-3 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-black hover:bg-grey-100 active:bg-blue-700"
                  >
                    Explore Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-full max-w-6xl">
          <Carousel className="rounded-xl">
            {projects.map((project, index) => (
              <div key={project._id} className="relative">
                <img
                  src={project.images?.[0]?.URL ?? "defaultImageFallbackURL"}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-contain" // Changed from object-cover to object-contain
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                  <div className="w-3/4 text-center md:w-2/4">
                    <Typography
                      variant="h1"
                      color="white"
                      className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                      {project.title}asdasd
                    </Typography>
                    <Typography
                      variant="lead"
                      color="white"
                      className="mb-12 opacity-80"
                    >
                      {project.description}asdasd
                    </Typography>
                    <div className="flex justify-center gap-2">
                      <Button size="lg" color="white">
                        Explore
                      </Button>
                      <Button size="lg" color="white" variant="text">
                        Gallery
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
