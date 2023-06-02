import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import { baseURL } from '../../environment';

function News() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [schedule, setSchedule] = useState(new Date());

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${baseURL}/news`); // Use the baseURL
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsData = {
      title,
      body: content,
      dateToPublish: schedule,
    };

    try {
      const response = await fetch(`${baseURL}/news/create`, { // Use the baseURL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ news: newsData }),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        setSchedule(new Date());
        fetchNews();
      } else {
        console.error('Failed to create news:', response.status);
      }
    } catch (error) {
      console.error('Error creating news:', error);
    }
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
            <TextField
              label="Schedule"
              type="datetime-local"
              variant="outlined"
              fullWidth
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Submit News
            </Button>
          </Grid>
        </Grid>
      </form>

      <h2>News Entries</h2>
      {news.map((entry) => (
        <div key={entry._id}>
          <h3>{entry.title}</h3>
          <p>{entry.body}</p>
          <p>Date to Publish: {entry.dateToPublish}</p>
        </div>
      ))}
    </Container>
  );
}

export default News;
