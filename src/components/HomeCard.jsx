import React, { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import LandingPage from "../pages/LandingPage";
import { Title } from "@mui/icons-material";
import { format } from "date-fns";

const HomeCard = () => {
  const [projects, setProjects] = useState([]);
  const fetchData = useFetch();

  const getProjects = async () => {
    try {
      const res = await fetchData("/api/projects", "GET");

      if (res.ok) {
        setProjects(res.data);
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
    <>
      <div className="grid w-full gap-10 grid-cols-3">
        {projects.map((project) => {
          const imageUrl =
            project.images?.[0]?.URL ?? "defaultImageFallbackURL"; // Safely access or provide default
          return (
            <div
              key={project._id}
              _id={project._id}
              owner={project.owner}
              className="bg-white w-full rounded-lg shadow-md flex flex-col transition-all overflow-hidden hover:shadow-2xl"
            >
              <div className="p-6">
                <div className="pb-3 mb-4 border-b border-stone-200 text-xs font-medium flex justify-between text-blue-900">
                  <span className="flex items-center gap-1">
                    {/* SVG for the clock icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    {project.createdDate
                      ? format(new Date(project.createdDate), "dd/MM/yyyy")
                      : "Unknown Date"}
                  </span>
                  {/* Optionally include other SVG/icon here */}
                </div>
                <h3 className="mb-4 font-semibold text-2xl">
                  <a
                    href="#"
                    className="transition-all text-blue-900 hover:text-blue-600"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-sky-800 text-sm mb-0">
                  {project.description}
                </p>
              </div>
              <div className="mt-auto">
                <img
                  src={imageUrl}
                  alt={project.images?.[0]?.description ?? "Project image"}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeCard;
