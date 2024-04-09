import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import QandA from "../components/QandA";

import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";

// mui
import {
  Paper,
  List,
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";

const QandASection = ({ selectedProjectID, projectOwner }) => {
  const [qAndA, setQandA] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const { user } = useUser();

  const questionRef = useRef("");

  const fetchData = useFetch();

  // code to make snackbar work
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/signin`;
    navigate(path);
  };

  const [open, setOpen] = useState(false);
  const handleSnackbar = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // end snackbar code

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (user.role === "contributor" || user.role === "user") &&
      questionInput.length !== 0
    ) {
      addQuestion();
      setQuestionInput("");
    } else if (questionInput.length === 0) {
      console.log(`Empty input`);
    } else {
      handleSnackbar();
    }
  };

  const getQandA = async () => {
    if (selectedProjectID !== null) {
      try {
        const res = await fetchData(
          "/api/projects/qa/" + selectedProjectID,
          "GET",
          undefined,
          undefined
        );

        if (res.ok) {
          setQandA(res.data);
        } else {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addQuestion = async () => {
    try {
      const res = await fetchData(
        "/api/projects/q/" + selectedProjectID,
        "PATCH",
        { question: questionRef.current.value },
        user.accessToken
      );

      if (res.ok) {
        getQandA();
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedProjectID !== undefined) getQandA();
  }, [selectedProjectID, projectOwner]);

  return (
    <>
      <Typography variant="h4">Q & A</Typography>
      {selectedProjectID && <p>{selectedProjectID}</p>}
      <Paper style={{ maxHeight: 300, overflow: "auto" }}>
        <List>
          {qAndA.map((item) => {
            return (
              <QandA
                key={item._id}
                question={item.question}
                answer={item.answer}
                id={item._id}
                projectOwner={projectOwner}
                getQandA={getQandA}
              />
            );
          })}
        </List>
      </Paper>
      <br />
      <br />

      {user.id !== projectOwner && (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            inputRef={questionRef}
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            label="Ask a question"
            maxRows={5}
            variant="standard"
            fullWidth
            inputProps={{ minLength: 20, maxLength: 3600 }}
            sx={{ maxWidth: 555 }}
          />

          <Button variant="outlined" type="submit">
            Ask
          </Button>

          <Snackbar
            open={open}
            autoHideDuration={7500}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={handleClose}
            message="Please login to ask questions"
            action={<Button onClick={routeChange}>Login</Button>}
          />
        </Box>
      )}
    </>
  );
};

export default QandASection;
