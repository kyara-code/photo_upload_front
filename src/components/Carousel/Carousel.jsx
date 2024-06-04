import React, { useEffect, useState } from 'react';
import PhotoCard from '../Card/PhotoCard';
import {Box, Grid} from '@mui/material';
import { deleteFile } from '../../models/file';

const Carousel = ({ photos, setRefresh, refresh }) => {
    const [selectedId, setSelectedId] = useState(null);

    useEffect(()=>{
        handleDelete(selectedId)
        setRefresh(!refresh)
    }, [selectedId])

    const handleDelete = (id) => {
        if(selectedId) {
            deleteFile(id)
            .then(res => console.log(res))
            .catch(err => console.log('Errore: ', err.message))
            .finally(()=>{
                setSelectedId(null)
            })
        }
    }

    return (
        <Box sx={{padding: '0 3em'}}>
            <Grid container flexWrap={'wrap'} gap={4}>
                {photos.map(photo => (
                    <PhotoCard key={photo.id} photo={photo} onDelete={()=>{
                        setSelectedId(photo.id)
                    }} />
                ))}
            </Grid>
        </Box>
    );
};

export default Carousel;
