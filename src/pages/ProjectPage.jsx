import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";

import { Button, Container, Grid, Paper } from "@mui/material";

import ProjectDetails from "../components/ProjectDetails";
import QandASection from "../components/QandASection";

const ProjectPage = () => {
  const fetchData = useFetch();
  const [project, setProject] = useState([{ title: "" }]);
  const getProjectDetails = async () => {
    try {
      const res = await fetchData(
        // REMEMBER TO CHANGE ENDPOINT TO PROPPED PROJECT ID
        "/api/projects/?projectID=" + projectID,
        "GET",
        undefined,
        undefined
      );

      if (res.ok) {
        setProject(res.data);
        console.log(`Project details fetched successfully`);
        console.log(projects);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {}
  };

  // DEV TEST FUNCTIONS
  const [projectID, setProjectID] = useState("6700ddf51fd1162aae22ea20");

  const testProjectA = () => {
    setProjectID("6700ddf51fd1162aae22ea20");
  };
  const testProjectB = () => {
    setProjectID("6700ddf51fd1162aae22ea26");
  };

  useEffect(() => getProjectDetails, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={1} marginTop={1}>
          <Grid container item spacing={2}>
            <Grid container item xs={12} md={5}>
              <Grid item xs={12}>
                <Paper>
                  Picture carousell goes here
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
                  <Button
                    onMouseEnter={() => testProjectA()}
                    onClick={() => getProjectDetails()}
                  >
                    test project A
                  </Button>
                  <Button
                    onMouseEnter={() => testProjectB()}
                    onClick={() => getProjectDetails()}
                  >
                    test project B
                  </Button>
                </Paper>
              </Grid>
            </Grid>

            <Grid container item spacing={3} xs={12} md={7}>
              <Grid item xs={12}>
                <ProjectDetails project={project} />

                <QandASection projectID={projectID} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* <ProjectDetails />
      <QandASection /> */}
    </>
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
