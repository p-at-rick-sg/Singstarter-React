import React, { useEffect, useRef, useState } from "react";
import QandA from "../components/QandA";
import useFetch from "../hooks/useFetch";
// mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Paper, List } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const ProjectPage = () => {
  // pretend this is usercontext for now
  const [login, setLogin] = useState(true);
  const [qAndA, setQandA] = useState([]);

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

  const askQuestion = async () => {
    try {
      const res = await fetchData(
        "/api/projects/qa/" + "6700ddf51fd1162aae22ea20",
        "PATCH",
        { question: questionRef.current.value },
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
                login={login}
                question={item.question}
                answer={item.answer}
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
          if (!login) {
            alert(`redirect to login/signup page`);
          } else {
            getProjects();
          }
        }}
      >
        Ask
      </Button>

      <Button
        variant="outlined"
        onClick={() => {
          if (!login) {
            alert(`redirect to login/signup page`);
          } else {
            console.log(questionRef.current.value);
          }
        }}
      >
        test
      </Button>
    </>
  );
};

export default ProjectPage;
