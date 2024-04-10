import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  Grid,
  Paper,
  Typography,
  Container,
  Button,
} from "@mui/material";

import Checkout from "./Checkout";

const ProjectDetails = (props) => {
  const navigate = useNavigate();
  const myData = useLocation();

  const handleClick = () => {
    const path = myData.pathname.split("/")[2];
    navigate(`/checkout/${path}`);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Typography variant="h4">{props.project[0].title}</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography>
            Target: ${props.project[0].currentTotal} / $
            {props.project[0].target}
          </Typography>
          <Typography>
            by{" "}
            {props.project[0].endDate
              ? format(new Date(props.project[0].endDate), "dd MMMM yyyy")
              : "Unknown Date"}
          </Typography>
          <Button variant="contained" size="large" onClick={handleClick}>
            Pledge Now
          </Button>
        </Grid>
        <Grid item>
          <Typography paragraph>{props.project[0].description}</Typography>
        </Grid>
      </Grid>

      <br />
    </>
  );
};

export default ProjectDetails;
