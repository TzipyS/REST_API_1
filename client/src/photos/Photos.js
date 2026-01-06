import { useEffect, useState } from "react";
import { fetchPhotos as ApifetchPhotos } from "./ApiPhotos";
import TitlebarImageList from "./ShowPhotos"
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import FormDialog from "./createPhoto"


const Photos = () => {
    const [photos, setPhotos] = useState([])

    const fetchPhotos = async () => {
        try {
            const { data } = await ApifetchPhotos()
            setPhotos(data)
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }
    useEffect(() => {
        fetchPhotos()
    }, [])

    if (photos.length === 0) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="photos" >
            <Button variant="outlined"
                component={RouterLink}
                to="/">
                HOME
            </Button>

                <FormDialog onPhotoCreated={fetchPhotos}/>
            
            <TitlebarImageList photos={photos} setPhotos={setPhotos} />
        </div>
    )
}
export default Photos;