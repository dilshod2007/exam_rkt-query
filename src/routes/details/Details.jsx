import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetailsQuery } from "../../rudux/api/userApi";
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useDetailsQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error('Error fetching user details!');
    return <div>Error loading user details.</div>;
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(270deg, #a2c4ff, #f8f9fc)',
        backgroundSize: '400% 400%',
        animation: 'backgroundAnimation 8s ease infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@keyframes backgroundAnimation': {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        overflow: 'hidden',
      }}
    >
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Container sx={{ padding: 4, maxWidth: 'lg', color: '#333' }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <motion.img
                  src={data.data.avatar}
                  alt={`${data.data.first_name} ${data.data.last_name}`}
                  style={{
                    borderRadius: '50%',
                    width: '300px',
                    height: '300px',
                    objectFit: 'cover',
                    border: '5px solid #fff',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h3" gutterBottom>
                  {data.data.first_name} {data.data.last_name}
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <FaEnvelope style={{ marginRight: 10 }} />
                  {data.data.email}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  {data.data.bio || 'No bio available'}
                </Typography>

                <Box display="flex" justifyContent="flex-start">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.history.back()}
                    startIcon={<FaArrowLeft />}
                    sx={{
                      backgroundColor: '#2575fc',
                      padding: '10px 20px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                  >
                    Go Back
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </motion.div>
      )}
      <ToastContainer />
    </Box>
  );
};

export default Details;
