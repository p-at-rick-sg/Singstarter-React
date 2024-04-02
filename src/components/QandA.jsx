import React, { useState } from "react";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

const QandA = (props) => {
  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            date/time
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            username
          </Typography>
          <Typography variant="body2">why do clocks run clockwise?</Typography>
        </CardContent>
        <CardActions>
          {props.login && (
            <Button
              size="small"
              onClick={() =>
                alert(`this button should show only when logged in`)
              }
            >
              Answer Question
            </Button>
          )}
        </CardActions>
      </Card>

      <br />
      <br />

      <br />
    </>
  );
};

export default QandA;
