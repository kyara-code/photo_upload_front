import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Grid
} from '@mui/material';
import { uploadFile } from '../../models/file';
import React, { useState } from 'react';

const PhotoUploaderModal = ({ open, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
      }
    };

    const handleUpload = async () => {
      uploadFile(selectedImage)
        .then(res => console.log(res))
        .catch(err => console.log(err.message))
        .finally(onClose)
    }

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Carica una nuova foto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container alignItems={'center'}>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {preview && <img src={preview} alt="Selected" />}
            </Grid>  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpload} disabled={!selectedImage}>Carica</Button>
          <Button onClick={onClose}>Chiudi</Button>
        </DialogActions>
      </Dialog>
    );
};

export default PhotoUploaderModal;
