import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createPost as ApicreatePost } from './ApiPosts';
import Alert from '@mui/material/Alert';

export default function FormDialog({ onPostCreated }) {

    const [error, setError] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const title = formJson.title || "";
        const body = formJson.body || "";


        if (!title || !body) {
            setError(["Both Title and Body are required"]);
            return;
        }

        try {
            const response = await ApicreatePost(title, body);
            console.log("Post created successfully:", response.data);
            onPostCreated();  
            setError([]);
            handleClose();
        } catch (err) {
            if (err.response && err.response.status === 400) {
                const messages = Array.isArray(err.response.data.errors)
                    ? err.response.data.errors
                    : [err.response.data.errors]; // אם זה string, עוטפים במערך
                setError(messages);
            } else {
                setError(["Server error. Please try again."]);
            }
        }
    };


    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Create New Post
            </Button>
            <Dialog open={open} onClose={handleClose} disableRestoreFocus>
                <DialogTitle>creation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details for TODO creativity
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <div>
                            <TextField label="Title" name="title" id="outlined-size-small" 
                            fullWidth margin="dense" required   helperText="This field is required"/>
                            <TextField label="Body" name="body" id="outlined-size-small" 
                            fullWidth margin="dense" required   helperText="This field is required"/>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Create
                    </Button>
                </DialogActions>
                {error.length > 0 && error.map((msg, index) => (
                    <Alert key={index} severity="error" style={{ marginBottom: "10px" }}>
                        {msg}
                    </Alert>
                ))}
            </Dialog>
        </React.Fragment>
    );
}
