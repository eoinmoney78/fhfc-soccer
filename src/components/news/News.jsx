import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import { baseURL } from '../../environment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function News() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [schedule, setSchedule] = useState(new Date());
  const [isAdmin, setIsAdmin] = useState(false); // Reset to false initially
  const [selectedDate, setSelectedDate] = useState(new Date());

  const hasEventOnDate = (date) => {
    const eventDates = news.map((entry) => {
      const entryDate = new Date(entry.dateToPublish);
      return new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate());
    });
    return eventDates.some((eventDate) => {
      return (
        date.getFullYear() === eventDate.getFullYear() &&
        date.getMonth() === eventDate.getMonth() &&
        date.getDate() === eventDate.getDate()
      );
    });
  };


  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    console.log('isAdmin:', isAdmin);
  }, [isAdmin]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${baseURL}/news`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${localStorage.getItem('token')}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }

      const data = await response.json();
      setNews(data);

      // Fetch the user's admin status

      const adminResponse = await fetch(`${baseURL}/user/me`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${localStorage.getItem('token')}`,
        }),
      });

      if (!adminResponse.ok) {
        throw new Error(`Failed to fetch admin status, status = ${adminResponse.status}`);
      }
   const { user } = await adminResponse.json();
      setIsAdmin(user.isAdmin);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isAdmin) {
      const newsData = {
        title,
        body: content,
        dateToPublish: schedule,
      };

      try {
        const response = await fetch(`${baseURL}/news/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ news: newsData }),
        });

        if (!response.ok) {
          throw new Error(`Failed to create news, status = ${response.status}`);
        }

        setTitle('');
        setContent('');
        setSchedule(new Date());
        fetchNews();
      } catch (error) {
        console.error('Error creating news:', error);
      }
    }
  };

  const handleEdit = async (entryId, newTitle, newContent, newSchedule) => {
    // Set the content state with the existing content
    setContent(newContent);
  
    const updatedData = {
      title: newTitle,
      body: newContent,
      dateToPublish: newSchedule,
    };
  
    try {
      const response = await fetch(`${baseURL}/news/${entryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ news: updatedData }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update news, status = ${response.status}`);
      }
  
      fetchNews();
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const handleDelete = async (entryId) => {
    try {
      const response = await fetch(`${baseURL}/news/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete news, status = ${response.status}`);
      }

      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  useEffect(() => {
    console.log("News state:", news);
  }, [news]);

  const highlightDates = () => {
    return news.map((entry) => new Date(entry.dateToPublish));
  };

  return (
    <Container>
      <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold' }}>
        Slate Valley United News
      </h2>
      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        inline
        highlightDates={highlightDates()}
      />
      {news.map((entry) => (
        <div key={entry._id}>
          <Typography variant="h4" gutterBottom>{entry.title}</Typography>
          <Typography variant="body1">{entry.body}</Typography>
          <Typography variant="body2" color="textSecondary">
            Date to Publish: {new Date(entry.dateToPublish).toLocaleString()}
          </Typography>
          {isAdmin && (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(entry._id, entry.title, entry.body, entry.dateToPublish)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(entry._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
      {isAdmin && (
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
      )}
    </Container>
  );
}

export default News;