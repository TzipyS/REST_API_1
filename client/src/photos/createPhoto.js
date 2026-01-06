import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CreatePhoto as apiCreatePhoto } from "./ApiPhotos";


export default function FormDialog({ onPhotoCreated }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const title = formJson.title || "";
        const imageUrl = formJson.imageUrl || ""
        console.log(title, imageUrl);
        //קריאה לשרת פה
        apiCreatePhoto(title, imageUrl).then((response) => {
            console.log("Photo created successfully:", response.data);
            onPhotoCreated();  
        }
        ).catch((error) => {
            console.error("Error creating photos:", error);
        });
        handleClose();
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Create New Photo
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>creation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details for PHOTO creativity
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <div>
                            <TextField
                                label="Title"
                                name="title"
                                id="outlined-size-small"
                                fullWidth margin="dense"
                                required
                                helperText="This field is required" />
                            <TextField
                                label="ImageUrl"
                                name="imageUrl"
                                required
                                helperText="This field is required" />
                        </div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
