import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserQuery } from "../../rudux/api/userApi";
import { Container, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';

const Details = () => {
  const { id } = useParams(); 
  const { data, error, isLoading } = useUserQuery(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data?.data) {
      const userDetails = data.data.find(user => user.id === parseInt(id));
      setUser(userDetails);
    }
  }, [data, id]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading user details</Typography>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Container sx={{ marginTop: 5 }}>
      <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Address: {user.address}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Phone: {user.phone}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Details;
