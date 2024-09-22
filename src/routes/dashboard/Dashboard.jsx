import React, { useState } from 'react';
import { useUserCreateMutation } from "../../rudux/api/userApi";
import { Container, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userCreate] = useUserCreateMutation();
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userCreate({ name, job }).unwrap(); 
      toast.success("User created successfully");
      setTimeout(() => {
        setName('');
        setJob('');
        setLoading(false); 
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error("Error creating user");
      setLoading(false); 
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(270deg, #d8d0e1, #2575fc, #d8d0e1)',
        backgroundSize: '400% 400%',
        animation: 'backgroundAnimation 7s ease infinite',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            maxWidth: 500,
            borderRadius: 3,
            backgroundColor: '#f9f9f9',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Create User
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                borderRadius: 2,
                backgroundColor: 'white',
              }}
            />
            <TextField
              label="Job"
              variant="outlined"
              fullWidth
              margin="normal"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              required
              sx={{
                borderRadius: 2,
                backgroundColor: 'white',
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                fontWeight: 'bold',
                padding: 1.5,
                marginTop: 2,
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
              disabled={loading} 
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
            </Button>
          </form>
        </Paper>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
