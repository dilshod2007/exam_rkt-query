import React from 'react'
import {useUserCreateMutation}  from "../../rudux/api/userApi"
import { Container, Typography, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';
import { useState } from 'react';


const Dashboard = () => {
   
  const [userCreate] = useUserCreateMutation()
  

  const [name, setName] =useState('')
  const [job, setJob] = useState('')

  const handleSubmit = ( e) => {
    userCreate({ name, job })
    e.preventDefault()
    setName('')
    setJob('')

    navigate('/')
    
  }
  
  return (
    <>
    <Container sx={{ marginTop: 5 }} className="form-container">
      <Typography variant="h4" gutterBottom>Create User</Typography>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <TextField
          label="Job"
          variant="outlined"
          fullWidth
          margin="normal"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
          className="input-field"
        />
        <Button type="submit" variant="contained" className="create-button">
          Create
        </Button>
      </form>
      <ToastContainer />
    </Container>
    </>
  )
}

export default Dashboard