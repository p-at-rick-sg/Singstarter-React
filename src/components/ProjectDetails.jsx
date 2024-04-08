import {
  Card,
  Grid,
  Paper,
  Typography,
  Container,
  Button,
} from "@mui/material";
import React from "react";

const ProjectDetails = (props) => {
  return (
    <>
      {/* <Paper>
        <Typography variant="h4">{props.project[0].title}</Typography>
        <Typography>asdf</Typography>
        <Typography item paragraph>
          {props.project[0].description}
        </Typography>
      </Paper> */}

      <Grid container spacing={2}>
        <Grid item md={8}>
          <Typography variant="h4">{props.project[0].title}</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography>
            Target: {props.project[0].currentTotal} / ${props.project[0].target}
          </Typography>
          <Button variant="contained" size="large">
            HI PATRICK
          </Button>
        </Grid>
        <Grid item>
          <Typography paragraph>{props.project[0].description}</Typography>
        </Grid>
      </Grid>

      {/* <Paper>
        <div>Project ID: {props.project[0]._id}</div>
        <div>User ID (project owner): {props.project[0].owner}</div>

        <div>Project Title: </div>
        <div>Project Description: </div>
        <div>Project target ($): {props.project[0].target}</div>
        <div>Project current total ($): {props.project[0].currentTotal}</div>
        <div>Project created date: {props.project[0].createdDate}</div>
        <div>Project end date: {props.project[0].endDate}</div>
      </Paper> */}
      <br />
    </>
  );
};

export default ProjectDetails;

/*
prop:
-[] project id
-[] user id (owner)
-[] project title
-[] project description
-[] project images
-[] project target
-[] project current total
-[] project created date
-[] project end date

ux flow:
- as user: 
    main page -> project page (contains components) -> <ProjectDetails />, <QandA />, <ImageCarousell />
                 ^prop project id & contributor id   

*/
