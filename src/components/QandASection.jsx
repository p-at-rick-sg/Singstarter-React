import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

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
import { useNavigate } from "react-router-dom";

const QandASection = ({ selectedProjectID, projectOwner }) => {
  const [qAndA, setQandA] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const { user } = useUser();

  const questionRef = useRef("");

  const fetchData = useFetch();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/signin`;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (user.role === "contributor" || user.role === "user") &&
      questionInput.length !== 0
    ) {
      addQuestion();
      setQuestionInput("");
    } else if (questionInput.length === 0) {
      console.log(`dog`);
    } else {
      handleSnackbar();
    }
  };

  const getQandA = async () => {
    // console.log(selectedProjectID);
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
          // console.log(`Projects fetched successfully`);
        } else {
          // alert(JSON.stringify(res.data));
          console.log(res.data);
        }
      } catch (error) {}
    }
  };

  const addQuestion = async () => {
    try {
      const res = await fetchData(
        // DON'T FORGET TO change the concat id to a propped value
        "/api/projects/q/" + selectedProjectID,
        "PATCH",
        { question: questionRef.current.value },
        user.accessToken
      );

      if (res.ok) {
        console.log(`question added successfully`);
        getQandA();
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedProjectID !== undefined) getQandA();
  }, [selectedProjectID]);

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

// TODO
// -[x] user context for login state
// -[x] add question to project using project id
// -[x] add answer to question using question id
// -[] toast for asking question when not logged in
// -[x] answer question button should only appear when logged in as contributor

/*
NOTES:
-[] put user _id in context to shortcircuit easier
*/
