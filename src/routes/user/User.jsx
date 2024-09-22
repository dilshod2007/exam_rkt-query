  import React, { useState, useEffect } from 'react';
  import { useUserQuery, useUserDeleteMutation } from "../../rudux/api/userApi";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import ThumbUpIcon from '@mui/icons-material/ThumbUp';
  import ThumbDownIcon from '@mui/icons-material/ThumbDown';
  import DeleteIcon from '@mui/icons-material/Delete';  
  import EditIcon from '@mui/icons-material/Edit';      
  import { Container, Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
  import { Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';

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
      userDelete(selectedUserId);
      toast.error(`User with ID: ${selectedUserId} is being deleted!`);
      setOpen(false);  
    };

    const handleEdit = (id) => {
      navigate(`/dashboard`);
    };

    const handleOpenDialog = (id) => {
      setSelectedUserId(id);
      setOpen(true);
    };

    const handleCloseDialog = () => {
      setOpen(false);
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
                          <EditIcon color="action" />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDialog(user.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Link to={`/details/${user.id}`}>
                      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            </Slide>
          ))}
        </Grid>

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
