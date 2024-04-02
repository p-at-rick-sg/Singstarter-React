import React, { useState } from "react";
import QandA from "../components/QandA";
// mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Paper, List } from "@mui/material";

const ProjectPage = () => {
  // pretend this is usercontext for now
  const [login, setLogin] = useState(false);
  return (
    <>
      <h1>Questions</h1>

      <Paper style={{ maxHeight: 400, maxWidth: 620, overflow: "auto" }}>
        <List>
          <QandA login={login} />
          <QandA login={login} />
          <QandA login={login} />
          <QandA login={login} />
          <QandA login={login} />
          <QandA login={login} />
        </List>
      </Paper>

      <br />
      <br />
      <br />

      <TextField
        id="standard-multiline-flexible"
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
            alert(`submit qn to db`);
          }
        }}
      >
        Ask
      </Button>
    </>
  );
};

export default ProjectPage;
