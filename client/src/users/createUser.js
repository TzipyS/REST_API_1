import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createUser as ApicreateUser } from './ApiUsers';


export default function FormDialog({onUserCreated }) {
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
        const name = formJson.name || "";
        const username = formJson.username || "";
        const email = formJson.email || "";
        const address = formJson.address || "";
        const phone = formJson.phone || "";
        console.log(name, username, email, address, phone);

        ApicreateUser(name, username, email, address, phone).then((response) => {
            console.log("User created successfully:", response.data);
             onUserCreated(); 
        }
        ).catch((error) => {
            console.error("Error creating user:", error);
        });
        handleClose();
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Create New User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>creation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details for USERS creativity
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <div>
                            <TextField label="Name" name="name" type="text" fullWidth margin="dense" 
                            required   helperText="This field is required"/>
                            <TextField label="Username" name="username" type="text" fullWidth margin="dense"
                            required   helperText="This field is required"/>
                            <TextField label="Email" name="email" type="email" fullWidth margin="dense"
                            required   helperText="This field is required"/>
                            <TextField label="Address" name="address" type="text" fullWidth margin="dense"/>
                            <TextField label="Phone" name="phone" type="tel" fullWidth margin="dense"/>
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
