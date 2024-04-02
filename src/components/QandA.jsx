import React, { useState } from "react";

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
          <Typography variant="body1">Question:</Typography>
          <Typography variant="body1">{props.question}</Typography>
          <br />
          <hr />

          {props.answer !== null && (
            <>
              <Typography variant="body1">Answer:</Typography>
              <Typography variant="body1">{props.answer}</Typography>
            </>
          )}
          {props.answer === null && (
            <>
              <Typography variant="body1">Answer:</Typography>
              <Typography variant="body1">Unanswered</Typography>
            </>
          )}
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
