import React, { useState, useEffect } from 'react';
import { useUserQuery, useUserDeleteMutation } from "../../rudux/api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';  
import EditIcon from '@mui/icons-material/Edit';      
import { Container, Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const User = () => {
  const { data } = useUserQuery();
  const [likes, setLikes] = useState({});
  const [userDelete] = useUserDeleteMutation();  

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    setLikes(savedLikes);
  }, []);

  const updateLocalStorage = (newLikes) => {
    localStorage.setItem('likes', JSON.stringify(newLikes));
  };

  const handleLike = (userId) => {
    const newLikes = {
      ...likes,
      [userId]: (likes[userId] || 0) + 1,
    };
    setLikes(newLikes);
    updateLocalStorage(newLikes);
    toast.success('You liked this user!');
  };

  const handleUnlike = (userId) => {
    const newLikes = {
      ...likes,
      [userId]: Math.max((likes[userId] || 0) - 1, 0),
    };
    setLikes(newLikes);
    updateLocalStorage(newLikes);
    toast.error('You unliked this user!');
  };

const handleDelete = (id) => {
  userDelete("users/" + id);
  toast.error(`User with ID: ${id} is being deleted!`);
}
  const handleEdit = (userId) => {
    toast.info(`User with ID: ${userId} is being edited!`);
  };

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid container spacing={4}>
        {data?.data?.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                sx={{
                  height: 280,
                  objectFit: 'cover',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>

                <Box display="flex " justifyContent="space-between" >
                <Box display="flex"  alignItems="center" mt={2}>
                  <Box display="flex">
                    <IconButton onClick={() => handleLike(user.id)}>
                      <ThumbUpIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleUnlike(user.id)}>
                      <ThumbDownIcon color="error" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {likes[user.id] || 0} Likes
                  </Typography>
                </Box>

                <Box display="flex"  mt={2}>
                  <IconButton onClick={() => handleEdit(user.id)}>
                    <EditIcon color="action" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
                </Box>

                <Link to={`/user/${user.id}`}>
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ToastContainer />
    </Container>
  );
};

export default User;
