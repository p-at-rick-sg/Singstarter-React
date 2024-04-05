import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { format } from "date-fns";

// Modal Component
const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded-lg max-w-md w-full space-y-4 relative">
        <h2 className="text-xl font-bold mb-2">{project.title}</h2>
        <img
          src={project.images?.[0]?.URL ?? "defaultImageFallbackURL"}
          alt="Project"
          className="mb-4"
        />
        <p className="text-gray-700 text-sm">{project.description}</p>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            More Info
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Pledge
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">
            Chat
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ProjectModal;
