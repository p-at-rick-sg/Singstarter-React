import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Container, Grid, Paper } from "@mui/material";
import ProjectDetails from "../components/ProjectDetails";
import QandASection from "../components/QandASection";

const ProjectPage = () => {
  const { id } = useParams(); // extract project ID from URL
  const fetchData = useFetch();
  const [project, setProject] = useState(null); // init "project" as null

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const res = await fetchData(`/api/projects/?projectID=${id}`, "GET");
        if (res.ok) {
          setProject(res.data);
          console.log(
            `Project details fetched successfully for project ID: ${id}`
          );
        } else {
          console.error("Failed to fetch project details:", res.data);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    getProjectDetails();
  }, [id]); // Only re-run the effect if `id` changes

  if (!project) {
    return <div>Loading project details...</div>;
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} marginTop={1}>
        <Grid container item spacing={2}>
          <Grid container item xs={12} md={5}>
            <Grid item xs={12}>
              <Paper>
                {/* Placeholder for your picture carousel */}
                Picture carousel goes here
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />.
                <br />
              </Paper>
            </Grid>
          </Grid>

          <Grid container item spacing={3} xs={12} md={7}>
            <Grid item xs={12}>
              <ProjectDetails project={project} />
              <QandASection
                selectedProjectID={id}
                projectOwner={project[0].owner}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectPage;

/*
ux flow:

- as contributor:
    main page -> project page (contains components) -> <ProjectDetails />, <QandASection />, <ImageCarousell /> -> ask/answer question
                 ^prop project id & contributor id   

- as user: 
    main page -> project page  -> view project details -> ask question
                 ^prop project id & contributor id   

    
*/
