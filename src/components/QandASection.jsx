import React, {useEffect, useRef, useState} from 'react';

import QandA from '../components/QandA';

import useFetch from '../hooks/useFetch';
import {useUser} from '../hooks/useUser';

// mui
import {Paper, List, Box, Button, TextField, Grid, Typography} from '@mui/material';

const QandASection = ({selectedProjectID}) => {
  const [qAndA, setQandA] = useState([]);
  const [questionInput, setQuestionInput] = useState('');
  const {user} = useUser();

  const questionRef = useRef('');

  const fetchData = useFetch();

  const handleSubmit = async e => {
    e.preventDefault();
    if (user.role === 'contributor' || user.role === 'user') {
      addQuestion();
      setQuestionInput('');
    } else {
      console.log(`dog`);
    }
  };

  const getQandA = async () => {
    console.log(selectedProjectID);
    try {
      const res = await fetchData(
        '/api/projects/qa/' + selectedProjectID,
        'GET',
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

  const addQuestion = async () => {
    try {
      const res = await fetchData(
        // DON'T FORGET TO change the concat id to a propped value
        '/api/projects/q/' + selectedProjectID,
        'PATCH',
        {question: questionRef.current.value},
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
      <Paper style={{maxHeight: 300, overflow: 'auto'}}>
        <List>
          {qAndA.map(item => {
            console.log(item);
            return (
              <QandA
                key={item._id}
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

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          inputRef={questionRef}
          value={questionInput}
          onChange={e => setQuestionInput(e.target.value)}
          label="Ask a question"
          maxRows={5}
          variant="standard"
          fullWidth
          inputProps={{minLength: 20, maxLength: 3600}}
          sx={{maxWidth: 555}}
        />

        <Button variant="outlined" type="submit">
          Ask
        </Button>
      </Box>
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
