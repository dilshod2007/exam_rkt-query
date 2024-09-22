import React, { useState, useEffect } from 'react';
import { useUserQuery, useUserDeleteMutation } from "../../rudux/api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';  
import EditIcon from '@mui/icons-material/Edit';      
import { Container, Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const User = () => {
  const navigate = useNavigate();
  const { data } = useUserQuery();
  const [likes, setLikes] = useState({});
  const [open, setOpen] = useState(false);  
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userDelete] = useUserDeleteMutation();
  const [loadingUserId, setLoadingUserId] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [deletingUserId, setDeletingUserId] = useState(null); 
  const [editingUserId, setEditingUserId] = useState(null); 

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

  const handleDelete = () => {
    setDeletingUserId(selectedUserId);
    userDelete(selectedUserId)
      .unwrap()
      .then(() => {
        toast.success(`User with ID: ${selectedUserId} has been deleted!`);
      })
      .catch((error) => {
        toast.error('Error deleting user!');
      })
      .finally(() => {
        setOpen(false);  
        setDeletingUserId(null); 
      });
  };

  const handleEdit = (id) => {
    setEditingUserId(id);
  
    setTimeout(() => {
      navigate('/dashboard'); 
      setEditingUserId(null); 
    }, 2000); 
  };

  const handleOpenDialog = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleViewDetails = (userId) => {
    setLoading(true);
    setLoadingUserId(userId);
    setTimeout(() => {
      navigate(`/details/${userId}`);
      setLoading(false);
    }, 2000); 
  };

  return (
    <Container sx={{ marginTop: 10 }}>
      

      <Grid container spacing={4}>
        {data?.data?.map((user, index) => (
          <Slide 
            direction="up" 
            in={true} 
            timeout={300 + index * 200} 
            key={index}
          >
            <Grid item xs={12} sm={6} md={4}>
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

                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Location: {user.location || "Not available"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Profession: {user.profession || "Not available"}
                  </Typography>

                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center" mt={2}>
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

                    <Box display="flex" mt={2}>
                      <IconButton onClick={() => handleEdit(user.id)}>
                        {editingUserId === user.id ? <CircularProgress size={24} /> : <EditIcon color="action" />}
                      </IconButton>
                      <IconButton onClick={() => handleOpenDialog(user.id)}>
                        {deletingUserId === user.id ? <CircularProgress size={24} /> : <DeleteIcon color="error" />}
                      </IconButton>
                    </Box>
                  </Box>

                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }} 
                    onClick={() => handleViewDetails(user.id)}
                    disabled={loading && loadingUserId === user.id} 
                  >
                    {loading && loadingUserId === user.id ? <CircularProgress size={24} /> : 'View Details'}
                  </Button>

                  <Box mt={2} pt={2} borderTop="1px solid #ddd">
                    <Typography variant="body2" color="text.secondary" align="center">
                      Click the button above to learn more about this user.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Slide>
        ))}
      </Grid>

      <Box 
        sx={{ 
          width: '100%', 
          padding: '1rem', 
          borderTop: '1px solid #ddd', 
          marginTop: '2rem',
          textAlign: 'center',
          backgroundColor: '#f9f9f9'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} User Directory. All rights reserved.
        </Typography>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            position: 'fixed',
            top: '10px',
            right: '10px',
            width: '300px', 
            boxShadow: 6,
            borderRadius: 2,
            backgroundColor: '#fff',
          },
        }}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Container>
  );
};

export default User;
