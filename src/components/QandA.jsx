import React, { useRef, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useUser } from "../hooks/useUser";
import useFetch from "../hooks/useFetch";

const QandA = (props) => {
  const user = useUser();
  const fetchData = useFetch();
  const [answerState, setAnswerState] = useState(false);
  const answerRef = useRef();

  const addAnswer = async () => {
    try {
      const res = await fetchData(
        "/api/projects/a/" + props.id,
        "PATCH",
        { answer: answerRef.current.value },
        user.user.accessToken
      );

      if (res.ok) {
        console.log(`answer added successfully`);
        props.getQandA();
        setAnswerState(false);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        <CardContent>
          {/* <Typography variant="body1">{props.id}</Typography> */}
          <Typography variant="body1">Question:</Typography>
          <Typography variant="body1">{props.question}</Typography>
          <br />
          <hr />
          <br />
          <Typography variant="body1">Answer:</Typography>

          {props.answer !== null && (
            <>
              {!answerState && (
                <Typography variant="body1">{props.answer}</Typography>
              )}
              {answerState && (
                <TextField
                  id="standard-multiline-flexible"
                  inputRef={answerRef}
                  label=""
                  defaultValue={props.answer}
                  multiline
                  maxRows={5}
                  variant="standard"
                  fullWidth
                  sx={{ maxWidth: 600 }}
                />
              )}
            </>
          )}
          {props.answer === null && (
            <>
              {!answerState && (
                <Typography variant="body1">Unanswered</Typography>
              )}
              {answerState && (
                <>
                  <TextField
                    id="standard-multiline-flexible"
                    inputRef={answerRef}
                    label=""
                    defaultValue={props.answer}
                    multiline
                    maxRows={5}
                    variant="standard"
                    fullWidth
                    sx={{ maxWidth: 600 }}
                  />
                </>
              )}
            </>
          )}
        </CardContent>
        <CardActions>
          {user.user.role === "contributor" && (
            <>
              {!answerState && (
                <Button size="small" onClick={() => setAnswerState(true)}>
                  Answer Question
                </Button>
              )}
              {answerState && (
                <Button size="small" onClick={() => addAnswer()}>
                  Done
                </Button>
              )}
            </>
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
