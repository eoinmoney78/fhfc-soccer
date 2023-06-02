import React, { useState } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/lab';

function News() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [schedule, setSchedule] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: call your API to store the news
    // you'll need to handle the date and time format to fit your backend
    const newsData = {
      title,
      content,
      schedule
    };

    console.log(newsData); // Debug: ensure we're capturing the data correctly
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField 
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField 
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>
          <Grid item>
            <DateTimePicker
              label="Schedule"
              inputFormat="MM/dd/yyyy hh:mm a"
              value={schedule}
              onChange={setSchedule}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Submit News
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default News;
