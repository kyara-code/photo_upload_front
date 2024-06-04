import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Carousel from './components/Carousel/Carousel';
import PhotoUploaderModal from './components/Uploader/PhotoUploadCard';
import { deleteFile, downloadAllFiles } from './models/file';
import { Box, Grid, Typography } from '@mui/material';

function App() {
  const [photos, setPhotos] = useState([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    handleDownloadAllPhotos()
  }, [refresh])

  const handleDownloadAllPhotos = () => {
      downloadAllFiles()
        .then(res => {
          console.log(res.data)
          setPhotos(res.data)
        })
        .catch(error => console.error('Errore durante il download:', error));
    };

    const handleUploadPhotos = () => {
        setOpenUploadModal(true)
    };

    return (
        <Box>
            <Typography component='h1' variant='h3' textAlign='center' sx={{paddingTop: '0.5em'}}>Photo Manager</Typography>
            <Grid container justifyContent={'flex-end'} sx={{padding: '3em'}} gap={4}>
              <Button variant="outlined" color='secondary' onClick={handleDownloadAllPhotos}>Scarica tutte le mie foto</Button>
              <Button variant="contained" color='success' onClick={handleUploadPhotos}>Carica foto</Button>
            </Grid>
            <Carousel photos={photos} setRefresh={setRefresh} refresh={refresh} />
            <PhotoUploaderModal open={openUploadModal} onClose={() => {
              setOpenUploadModal(false)
              setRefresh(!refresh)
            }}  />
        </Box>
    );
}

export default App;
