import React from 'react';
import Card from '@mui/material/Card';
import {CardContent, Typography, Button} from '@mui/material';

const PhotoCard = ({ photo, onDelete }) => {
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Foto {photo.name}
        </Typography>
        <img src={`${photo.url}`} alt={`Foto ${photo.name}`} style={{ width: '100%', height: 'auto' }} />
      </CardContent>
      <Button onClick={onDelete}>Elimina</Button>
    </Card>
  );
};

export default PhotoCard;
