import React, { useEffect, useRef, useState } from "react";

import ProjectDetails from "../components/ProjectDetails";
import QandASection from "../components/QandASection";

const ProjectPage = () => {
  return (
    <>
      <ProjectDetails />
      <QandASection />
    </>
  );
};

export default ProjectPage;
