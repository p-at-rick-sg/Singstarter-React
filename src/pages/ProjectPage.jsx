import React, { useEffect, useRef, useState } from "react";
import QandA from "../components/QandA";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";

// mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Paper, List } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const ProjectPage = () => {
  const [qAndA, setQandA] = useState([]);
  const [questionInput, setQuestionInput] = useState();
  const user = useUser();
  // user.accessToken to use access token

  const questionRef = useRef("");

  const fetchData = useFetch();

  const getQandA = async () => {
    try {
      const res = await fetchData(
        "/api/projects/qa/" + "6700ddf51fd1162aae22ea20",
        "GET",
        undefined,
        undefined
      );

      if (res.ok) {
        setQandA(res.data);
        console.log(`Projects fetched successfully`);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {}
  };

  // TODO
  // -[x] user context for login state
  // -[x] add question to project using project id
  // -[x] add answer to question using question id
  // -[] toast for asking question when not logged in
  // -[x] answer question button should only appear when logged in as contributor

  const addQuestion = async () => {
    try {
      const res = await fetchData(
        // DON'T FORGET TO change the concat id to a propped value
        "/api/projects/q/" + "6700ddf51fd1162aae22ea20",
        "PATCH",
        { question: questionRef.current.value },
        user.user.accessToken
      );

      if (res.ok) {
        console.log(`question added successfully`);
        getQandA();
        setQuestionInput("");
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => getQandA, []);

  return (
    <>
      <h1>Questions</h1>

      <Paper style={{ maxHeight: 400, maxWidth: 620, overflow: "auto" }}>
        <List>
          {qAndA.map((item) => {
            console.log(item);
            return (
              <QandA
                question={item.question}
                answer={item.answer}
                id={item._id}
                getQandA={getQandA}
              />
            );
          })}
        </List>
      </Paper>

      <br />
      <br />
      <br />

      <TextField
        id="standard-multiline-flexible"
        inputRef={questionRef}
        value={questionInput}
        label="Ask a question"
        multiline
        maxRows={5}
        variant="standard"
        fullWidth
        sx={{ maxWidth: 600 }}
      />

      <Button
        variant="outlined"
        onClick={() => {
          if (user.user.role === "contributor" || user.user.role === "user") {
            addQuestion();
          } else {
            console.log(`dog`);
          }
        }}
      >
        Ask
      </Button>
    </>
  );
};

export default ProjectPage;
